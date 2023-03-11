import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { Page, PageSchema } from '../pages/entities/page.entity';
import { PageModule } from '../pages/pages.module';
import { DashboardViewController as ChannelController } from './channel.controller';
import { ChannelService as ChannelService } from './channel.service';
import { Channel, ChannelSchema } from './entities/channel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    GuardsModule,
    PageModule,
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
