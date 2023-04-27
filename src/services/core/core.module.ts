import { Module } from '@nestjs/common';
import { GuardsModule } from '../auth/guards/guards.module';
import { ChannelModule } from './channels/channel.module';
import { PageModule } from './pages/pages.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ChannelModule,
    PageModule,
    // SubscriptionModule,
    VideosModule,
    GuardsModule,
  ],
})
export class CoreModule {}
