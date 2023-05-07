import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { PageType } from '../page/enums/page-type.enum';
import { PageService } from '../page/page.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { CreateVideoDto } from './dto/request/create-video.dto';
import { VideoResponseDto } from './dto/request/fetch-videos.dto';
import { FindVideosByFiltersDto } from './dto/request/find-videos-by-filters.dto';
import { PublishVideosDto } from './dto/request/publish-videos.dto';
import { UnpublishVideosDto } from './dto/request/unpublish-videos.dto';
import { UpdateVideoPagesDto } from './dto/request/update-video-pages';
import { UpdateVideoDto } from './dto/request/update-video.dto';
import { VideoResponse } from './dto/response/video-response.dto';
import { Video, VideoDoc } from './entities/video.entity';
import { FindChannelVideosByFiltersDto } from './dto/request/find-channel-videos-by-filters.dto';
import { VideoPage, VideoPageDoc } from './entities/video-page.entity';
import { BlogService } from '../blog/blog.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private videoModel: Model<VideoDoc> & SoftDeleteModel<VideoDoc>,
    @InjectModel(VideoPage.name)
    private videoPageModel: Model<VideoPageDoc> & SoftDeleteModel<VideoPageDoc>,
    private subscriptionService: SubscriptionService,
    private pageService: PageService,
    private blogService: BlogService,
  ) {}

  async create(channelId: string, createVideoDto: CreateVideoDto) {
    createVideoDto.channelId = channelId;
    const createdVideo = new this.videoModel<Video>(createVideoDto as Video);
    return await createdVideo.save();
  }

  async findVideosByFilters(
    findVideosDto: FindVideosByFiltersDto,
  ): Promise<VideoResponseDto> {
    // Get videosIds using pageIds
    if (findVideosDto.filters.pageId) {
      findVideosDto.filters.pageIds = { $in: [findVideosDto.filters.pageId] };
      const videoPages = await this.videoPageModel.find({
        channelId: findVideosDto.filters.channelId,
        pageId: findVideosDto.filters.pageId,
      });

      const videoIds = videoPages.map((videoPage) => {
        return videoPage.videoId;
      });

      findVideosDto.filters._id = { $in: videoIds };
    }

    findVideosDto.filters.isPublished = true;

    return this._findVideosByFilters(
      findVideosDto.filters,
      findVideosDto.sort,
      findVideosDto.pagination.page,
      findVideosDto.pagination.limit,
    );
  }

  async findChannelVideosByFilters(
    channelId: string,
    findVideosDto: FindChannelVideosByFiltersDto,
  ): Promise<VideoResponseDto> {
    return await this._findVideosByFilters(
      {
        channelId,
        ...findVideosDto.filter,
      },
      findVideosDto.sort,
      findVideosDto.pagination.page,
      findVideosDto.pagination.limit,
    );
  }

  async findOne(channelId: string, videoId: string) {
    const video = (
      await this.videoModel.findOne({
        _id: videoId,
        channelId,
      })
    ).toJSON() as VideoResponse;

    const videoResDto = await this.createVideoResponse(
      video.channelId as string,
      video,
    );

    return videoResDto;
  }

  async update(videoId: string, updateVideoDto: UpdateVideoDto) {
    const video = (
      await this.videoModel.findOneAndUpdate({ _id: videoId }, updateVideoDto, {
        new: true,
      })
    ).toJSON();

    return video;
  }

  async remove(videoId: string) {
    await this.videoModel.deleteById(videoId);
  }

  /**
   * First gets all pageIds in the database for the given videoIds.
   * Then creates list of pair of videoId and pageId to remove and add.
   * We ignore the pair that already exists in the database.
   * Then we remove all the pairs that are in the remove list.
   * Then we add all the pairs that are in the add list.
   *
   * @param channelId
   * @param updateVideoPagesDto: List of videoId and all pageIds for that video.
   */
  async updateVideoPages(
    channelId: string,
    updateVideoPagesDto: UpdateVideoPagesDto,
  ) {
    const videoPages = updateVideoPagesDto.videoPages;

    console.log('videoPages', videoPages);

    // Create videoId to pageIds map with all , remove and new pageIds
    const videoPagesMap: {
      [key: string]: {
        new: string[];
        old: string[];
        remove: string[];
        add: string[];
      };
    } = {};
    videoPages.forEach((videoPage) => {
      videoPagesMap[videoPage.videoId] = {
        new: videoPage.pageIds,
        old: [],
        remove: [],
        add: [],
      };
    });

    // Get old video pages for all videoIds
    const oldVideoPagesDocs = await this.videoPageModel.find({
      videoId: { $in: Object.keys(videoPagesMap) },
      channelId: channelId,
    });

    // Set pageIds to remove from videos
    oldVideoPagesDocs.map(async (videoPage) => {
      const videoPageConfig = videoPagesMap[videoPage.videoId];
      videoPageConfig.old.push(videoPage.pageId);
      if (!videoPageConfig.new.includes(videoPage.pageId)) {
        videoPageConfig.remove.push(videoPage.pageId);
      }
    });

    // Set new pageIds to add to videos
    Object.values(videoPagesMap).forEach((videoPageConfig) => {
      videoPageConfig.add = videoPageConfig.new.filter(
        (pageId) =>
          !videoPageConfig.remove.includes(pageId) &&
          !videoPageConfig.old.includes(pageId),
      );
    });

    // VideoId and PageId pair to remove
    const videoPagePairsToRemove: {
      videoId: string;
      pageId: string;
      channelId: string;
    }[] = [];
    Object.entries(videoPagesMap).forEach(([videoId, videoPageConfig]) => {
      videoPageConfig.remove.forEach((pageId) => {
        videoPagePairsToRemove.push({ videoId, pageId, channelId });
      });
    });

    // VideoId and PageId pair to add
    const videoPagePairsToAdd: {
      videoId: string;
      pageId: string;
      channelId: string;
    }[] = [];
    Object.entries(videoPagesMap).forEach(([videoId, videoPageConfig]) => {
      videoPageConfig.add.forEach((pageId) => {
        videoPagePairsToAdd.push({ videoId, pageId, channelId });
      });
    });

    // Remove video pages
    if (videoPagePairsToRemove.length > 0) {
      await this.videoPageModel.deleteMany({
        $or: videoPagePairsToRemove,
      });
    }

    // Add video pages
    if (videoPagePairsToAdd.length > 0) {
      await this.videoPageModel.insertMany(videoPagePairsToAdd);
    }
  }

  async publishVideos(channelId: string, publishVideos: PublishVideosDto) {
    await this.videoModel.updateMany(
      { _id: { $in: publishVideos.videoIds }, channelId },
      { isPublished: true },
    );
  }

  async unpublishVideos(
    channelId: string,
    unpublishVideos: UnpublishVideosDto,
  ) {
    await this.videoModel.updateMany(
      { _id: { $in: unpublishVideos.videoIds }, channelId },
      { isPublished: false },
    );
  }

  private async createVideoResponse(channelId: string, video: VideoResponse) {
    const videos = await this.createVideoResponses(channelId, [video]);
    return videos[0];
  }

  // Add subscriptions and pages to the video response
  private async createVideoResponses(
    channelId: string,
    videos: VideoResponse[],
  ): Promise<VideoResponse[]> {
    // const subscriptions = await this.subscriptionService.findAll(channelId);

    // Get all pages for channel from database
    const pages = await this.pageService.findChannelPagesByFilters(channelId, {
      pageTypes: [PageType.CUSTOM],
    });

    // Extract videoIds from videos
    const videoIds = videos.map((video) => video.id);
    const blogIds = videos.map((video) => video.blogId);

    const blogs = await this.blogService.findAllByIds(blogIds);

    const blogIdToBlogMap = blogs.reduce((prev, blog) => {
      prev[blog.id] = blog;
      return prev;
    }, {});

    // Get all video pages for the given videoIds.
    const videoPages = await this.videoPageModel.find({
      videoId: { $in: videoIds },
    });

    // Create a map of videoId to pageIds
    const videoPagesMap = videoPages.reduce((prev, videoPage) => {
      if (!prev[videoPage.videoId]) {
        prev[videoPage.videoId] = [];
      }
      prev[videoPage.videoId].push(videoPage.pageId);
      return prev;
    }, {});

    // Add pageIds to videos
    videos = videos.map((video) => {
      video.pageIds = videoPagesMap[video.id] || [];
      return video;
    });

    // Add subscriptions and pages to videos
    videos.forEach((video) => {
      video.pages = [];

      // TODO: Commented for future releases
      // video.subscriptions = [];
      // video.subscriptionIds.forEach((subscriptionId) => {
      //   if (subscriptionId) {
      //     const subscription = subscriptions.find(
      //       (subscription) => subscription.id === subscriptionId,
      //     );
      //     video.subscriptions.push({
      //       id: subscription.id,
      //       title: subscription.title,
      //     });
      //   }
      // });

      // Replace blog's first paragraph with video description
      video.description =
        blogIdToBlogMap[video.blogId]?.editorData?.blocks[0]?.data?.text || '';

      video.pages = pages
        .filter((page) => video.pageIds.includes(page.id as any))
        .map((page) => ({ id: page.id, title: page.title }));
    });

    return videos;
  }

  private async _findVideosByFilters(
    filters: { channelId: string } & any,
    sort: any,
    page: number,
    limit: number,
  ) {
    const total = await this.videoModel.count(filters);

    let videos = (
      await this.videoModel
        .find(filters)
        .sort(sort)
        .skip(limit * page)
        .limit(limit)
    ).map(toJSON) as VideoResponse[];

    videos = await this.createVideoResponses(filters.channelId, videos);

    return {
      pagination: {
        total,
        page: page,
        limit: limit,
        size: videos.length,
      },
      data: videos,
    };
  }
}
