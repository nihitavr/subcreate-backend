import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../core/video/entities/video.entity';
import {
  VideoPage,
  VideoPageSchema,
} from '../core/video/entities/video-page.entity';
import { ChannelModule } from '../core/channel/channel.module';
import { PageModule } from '../core/page/page.module';
import { VideoModule } from '../core/video/video.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: VideoPage.name, schema: VideoPageSchema },
    ]),
    ChannelModule,
    PageModule,
    VideoModule,
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
