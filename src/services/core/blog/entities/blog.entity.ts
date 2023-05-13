import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { BaseEntity } from 'src/services/common/entities/base-entity';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';

export class BlogData {
  @Prop({ required: true })
  blocks: any[];

  @Prop()
  time?: string;

  @Prop()
  version?: string;
}

export type BlogDoc = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog extends BaseEntity {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId: ObjectId | string;

  @Prop({ required: true })
  isVideoBlog: boolean;

  @Prop({ required: true })
  editorData: BlogData;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.set('toJSON', SchemaToJson);
