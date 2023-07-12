import { Injectable } from '@nestjs/common';
import { FindRecommendationDto } from './dto/find-recommendation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDoc } from '../core/video/entities/video.entity';
import {
  VideoPage,
  VideoPageDoc,
} from '../core/video/entities/video-page.entity';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { ChannelService } from '../core/channel/channel.service';
import { PageService } from '../core/page/page.service';
import { VideoService } from '../core/video/video.service';

@Injectable()
export class RecommendationService {
  constructor(
    private channelService: ChannelService,
    private pageService: PageService,
    private videoService: VideoService,
    @InjectModel(Video.name)
    private videoModel: Model<VideoDoc>,
    @InjectModel(VideoPage.name)
    private videoPageModel: Model<VideoPageDoc>,
  ) {}
  async findAll(findRecommendationDto: FindRecommendationDto) {
    const channelId = await this.channelService.getIdForSlug(
      findRecommendationDto.channelSlug,
    );

    let videos = [];

    if (findRecommendationDto.pageSlug) {
      const pageId = await this.pageService.getIdForSlug(
        findRecommendationDto.pageSlug,
      );

      const videoPages = toJSON(
        await this.videoPageModel.find({ channelId, pageId }),
      );

      const videoIds = videoPages.map((videoPage) => videoPage.videoId);

      videos = toJSON(
        await this.videoModel
          .find({
            _id: { $in: videoIds },
            slug: { $ne: findRecommendationDto.videoSlug },
          })
          .sort({ publishedAt: -1 })
          .skip(findRecommendationDto.limit * findRecommendationDto.page)
          .limit(findRecommendationDto.limit),
      );
    } else {
      videos = toJSON(
        await this.videoModel
          .find({ channelId, slug: { $ne: findRecommendationDto.videoSlug } })
          .sort({ publishedAt: -1 })
          .skip(findRecommendationDto.limit * findRecommendationDto.page)
          .limit(findRecommendationDto.limit),
      );
    }

    return await this.videoService.createVideoResponseList(videos);
  }
}
