import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { PageType } from '../pages/enums/page-type.enum';
import { PageService } from '../pages/pages.service';
import { SubscriptionService } from '../subscriptions/subscriptions.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoResponseDto } from './dto/fetch-videos.dto';
import { FindVideosDto } from './dto/find-videos.dto';
import { PublishVideosDto } from './dto/publish-videos.dto';
import { UnpublishVideosDto } from './dto/unpublish-videos.dto';
import { UpdateVideoPagesDto } from './dto/update-video-pages';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoResponseData } from './dto/video-response.dto';
import { Video, VideoDoc } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private videoModel: Model<VideoDoc> & SoftDeleteModel<VideoDoc>,
    private subscriptionService: SubscriptionService,
    private pageService: PageService,
  ) {}

  async create(channelId: string, createVideoDto: CreateVideoDto) {
    createVideoDto.channelId = channelId;
    const createdVideo = new this.videoModel<Video>(createVideoDto as Video);
    return await createdVideo.save();
  }

  async findAll(
    channelId: string,
    findVideosDto: FindVideosDto,
  ): Promise<VideoResponseDto> {
    const total = await this.videoModel.count({
      channelId,
      ...findVideosDto.filter,
    });

    let videos = (
      await this.videoModel
        .find({ channelId, ...findVideosDto.filter })
        .sort({ ...findVideosDto.sort })
        .skip(findVideosDto.pagination.limit * findVideosDto.pagination.page)
        .limit(findVideosDto.pagination.limit)
    ).map(toJSON) as VideoResponseData[];

    videos = await this.createVideoResponses(channelId, videos);

    return {
      pagination: {
        total,
        page: findVideosDto.pagination.page,
        limit: findVideosDto.pagination.limit,
        size: videos.length,
      },
      data: videos,
    };
  }

  async findOne(channelId: string, videoId: string) {
    const video = (
      await this.videoModel.findOne({
        _id: videoId,
        channelId,
      })
    ).toJSON() as VideoResponseData;

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

  async updateVideoPages(
    channelId: string,
    updateVideoPagesDto: UpdateVideoPagesDto,
  ) {
    const videoPages = updateVideoPagesDto.videoPages;

    const allPageIdsSet = new Set<string>();
    videoPages.forEach((videoPage) => {
      videoPage.pageIds.forEach((pageId) => allPageIdsSet.add(pageId));
    });

    const pageExists = await this.pageService.existsAll(
      channelId,
      Array.from<string>(allPageIdsSet),
    );

    const pageExistIdsSet = new Set();
    pageExists.forEach((page) => pageExistIdsSet.add(page.id));

    await Promise.all(
      videoPages.map(async (videoPage) => {
        const pageIds = videoPage.pageIds.filter((pageId) =>
          pageExistIdsSet.has(pageId),
        );

        await this.videoModel.updateOne(
          { _id: videoPage.videoId },
          { pageIds: Array.from(new Set(pageIds)) },
        );
      }),
    );
  }

  private async createVideoResponse(
    channelId: string,
    video: VideoResponseData,
  ) {
    const videos = await this.createVideoResponses(channelId, [video]);
    return videos[0];
  }

  // Add subscriptions and pages to the video response
  private async createVideoResponses(
    channelId: string,
    videos: VideoResponseData[],
  ): Promise<VideoResponseData[]> {
    const subscriptions = await this.subscriptionService.findAll(channelId);
    const pages = await this.pageService.findAll(channelId, {
      pageTypes: [PageType.CUSTOM],
    });

    videos.forEach((video) => {
      video.subscriptions = [];
      video.pages = [];

      video.subscriptionIds.forEach((subscriptionId) => {
        if (subscriptionId) {
          const subscription = subscriptions.find(
            (subscription) => subscription.id === subscriptionId,
          );
          video.subscriptions.push({
            id: subscription.id,
            title: subscription.title,
          });
        }
      });

      video.pageIds.forEach((pageId) => {
        const page = pages.find((page) => page.id === pageId);
        video.pages.push({ id: page.id, title: page.title });
      });
    });

    return videos;
  }
}
