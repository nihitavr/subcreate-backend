import { Module } from '@nestjs/common';
import { GuardsModule } from '../auth/guards/guards.module';
import { ChannelModule } from './channel/channel.module';
import { PageModule } from './page/page.module';
import { VideoModule } from './video/video.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ChannelModule,
    PageModule,
    VideoModule,
    BlogModule,
    GuardsModule,
    // SubscriptionModule,
  ],
})
export class CoreModule {}
