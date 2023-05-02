import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosDashboardController } from './videos-dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { SubscriptionModule } from '../subscriptions/subscriptions.module';
import { PageModule } from '../pages/pages.module';
import { VideosController } from './videos.controller';
import { VideoPage, VideoPageSchema } from './entities/video-page.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: VideoPage.name, schema: VideoPageSchema },
    ]),
    GuardsModule,
    SubscriptionModule,
    PageModule,
  ],
  controllers: [VideosDashboardController, VideosController],
  providers: [VideosService],
})
export class VideosModule {}
