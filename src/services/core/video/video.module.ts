import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoDashboardController } from './video-dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { PageModule } from '../page/page.module';
import { VideoController } from './video.controller';
import { VideoPage, VideoPageSchema } from './entities/video-page.entity';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: VideoPage.name, schema: VideoPageSchema },
    ]),
    GuardsModule,
    SubscriptionModule,
    PageModule,
    BlogModule,
  ],
  controllers: [VideoDashboardController, VideoController],
  providers: [VideoService],
})
export class VideoModule {}
