import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ChannelModule } from './channels/channel.module';
import { PageModule } from './pages/pages.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ChannelModule,
    PageModule,
    SubscriptionsModule,
    VideosModule,
    // RouterModule.register([
    //   {
    //     path: 'channels/:channelId',
    //     children: [PageModule],
    //   },
    // ]),
  ],
})
export class CoreModule {}
