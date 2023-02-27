import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { ChannelAppearance } from './classes/channel-appearance.class';
import { ChannelSocial } from './classes/channel-social.class';
import { NavbarItem } from './classes/navbar-item.class';
import { ChannelSEO } from './classes/channel-seo.class';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/services/users/entities/user.entity';
import { BaseEntity } from 'src/lib/entities/base-entity';

export type ChannelDoc = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel extends BaseEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId | string;
  user?: User;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  about?: string;

  @Prop({ required: true })
  social: ChannelSocial;

  @Prop({ required: true })
  appearance: ChannelAppearance;

  @Prop({ required: true })
  navbar?: NavbarItem[];

  @Prop({ required: true })
  seo: ChannelSEO;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
ChannelSchema.index({ slug: 1 }, { unique: true });
ChannelSchema.set('toJSON', SchemaToJson);
