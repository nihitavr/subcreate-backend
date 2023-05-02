import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import * as mongooseDelete from 'mongoose-delete';

export type VideoPageDoc = HydratedDocument<VideoPage>;

@Schema({ timestamps: true })
export class VideoPage {
  @Prop()
  videoId: string;

  @Prop()
  pageId: string;

  @Prop()
  channelId: string;
}

export const VideoPageSchema = SchemaFactory.createForClass(VideoPage);
VideoPageSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});
VideoPageSchema.index({ videoId: 1 });
VideoPageSchema.index({ pageId: 1 });
VideoPageSchema.index({ videoId: 1, pageId: 1 }, { unique: true });
VideoPageSchema.set('toJSON', SchemaToJson);
