import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel } from 'diagnostics_channel';
import { ChannelSchema } from 'src/services/core/channels/entities/channel.entity';
import { JwtAuthGuard } from './jwt.guard';
import { Page, PageSchema } from 'src/services/core/pages/entities/page.entity';
import { UserChannelAuthorizationGuard } from './user-channel-authorization.guard';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/services/core/subscriptions/entities/subscription.entity';
import {
  Video,
  VideoSchema,
} from 'src/services/core/videos/entities/video.entity';
import { User, UserSchema } from 'src/services/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [JwtAuthGuard],
  exports: [
    JwtAuthGuard,
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class GuardsModule {}
