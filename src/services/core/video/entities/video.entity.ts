import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import * as mongooseDelete from 'mongoose-delete';

export class ThumbnailUrl {
  @Prop()
  url: string;

  @Prop()
  width: number;

  @Prop()
  height: number;
}

export class Thumbnails {
  @Prop()
  default: ThumbnailUrl;

  @Prop()
  medium: ThumbnailUrl;

  @Prop()
  high: ThumbnailUrl;
}

export type VideoDoc = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId: ObjectId | string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Blog', required: true })
  blogId?: ObjectId | string;

  @Prop({ required: true, default: 0 })
  durationInSecs?: number;

  @Prop({ default: [] })
  tags: string[];

  @Prop()
  thumbnails: Thumbnails;

  @Prop({ default: '' })
  originalURL: string;

  @Prop({ default: false })
  isYoutubeURL: boolean;

  @Prop({ default: [] })
  subscriptionIds: ObjectId[] | string[];

  @Prop({ default: null })
  publishedAt?: Date;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isFileUploaded: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});
VideoSchema.index({ channelId: 1 });
VideoSchema.index({ pageIds: 1 });
VideoSchema.set('toJSON', SchemaToJson);
