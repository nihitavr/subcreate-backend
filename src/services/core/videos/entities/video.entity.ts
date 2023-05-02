import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import * as mongooseDelete from 'mongoose-delete';

export type VideoDoc = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId: ObjectId | string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, default: 0 })
  durationInSecs?: number;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: '' })
  thumbnailURL: string;

  @Prop({ default: '' })
  originalURL: string;

  @Prop({ default: false })
  isYoutubeURL: boolean;

  @Prop({ default: [] })
  subscriptionIds: ObjectId[] | string[];

  @Prop({ default: null })
  publishedAt: Date;

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
