import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';

export class Video {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel' })
  channelId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  durationInSecs: number;

  @Prop()
  tags: string[];

  @Prop()
  thumbnail: string;

  @Prop()
  originalURL: string;

  @Prop()
  isYoutubeURL: boolean;

  @Prop()
  subscriptionIds: ObjectId[] | string[];

  @Prop()
  publishedAt: Date;

  @Prop({ default: false })
  published: boolean;

  @Prop({ default: false })
  uploaded: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({ channelId: 1 });
VideoSchema.set('toJSON', SchemaToJson);
