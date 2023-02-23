import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { PageSeo } from '../classes/page-seo.class';
import { PageType } from '../enums/page-type.enum';

export class Page {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel' })
  channelId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  type: PageType;

  @Prop()
  seo: PageSeo;
}

export const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.index({ channelId: 1 });
PageSchema.index({ slug: 1 }, { unique: true });
PageSchema.set('toJSON', SchemaToJson);
