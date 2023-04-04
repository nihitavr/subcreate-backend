import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { YoutubeModule } from 'src/services/youtube/youtube.module';
import { Page, PageSchema } from '../pages/entities/page.entity';
import { PageModule } from '../pages/pages.module';
import { Video, VideoSchema } from '../videos/entities/video.entity';
import { DashboardViewController as ChannelController } from './channel.controller';
import { ChannelService as ChannelService } from './channel.service';
import { Channel, ChannelSchema } from './entities/channel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    GuardsModule,
    PageModule,
    YoutubeModule,
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
