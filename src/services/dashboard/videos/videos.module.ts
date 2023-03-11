import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { SubscriptionModule } from '../subscriptions/subscriptions.module';
import { PageModule } from '../pages/pages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    GuardsModule,
    SubscriptionModule,
    PageModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
