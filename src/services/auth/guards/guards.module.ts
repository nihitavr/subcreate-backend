import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel } from 'diagnostics_channel';
import { ChannelSchema } from 'src/services/core/channels/entities/channel.entity';
import { JwtAuthGuard } from './jwt.guard';
import { Page, PageSchema } from 'src/services/core/pages/entities/page.entity';
import { UserChannelAuthorizationGuard } from './user-channel-authorization.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  providers: [JwtAuthGuard, UserChannelAuthorizationGuard],
  exports: [
    JwtAuthGuard,
    UserChannelAuthorizationGuard,
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
})
export class GuardsModule {}
