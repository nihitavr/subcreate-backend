import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { PageSections } from '../dto/page-sections.dto';
import { PageSeo } from '../dto/page-seo.dto';
import { PageType } from '../enums/page-type.enum';
import * as mongooseDelete from 'mongoose-delete';
import { BaseEntity } from 'src/lib/entities/base-entity';
import { PageSectionLayout } from '../dto/page-section-layout.dto';

export type PageDoc = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page extends BaseEntity {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId?: ObjectId | string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  type: PageType;

  @Prop()
  seo: PageSeo;

  @Prop({ required: true })
  sections: PageSectionLayout[];

  @Prop({ default: [] })
  videoIds: ObjectId[] | string[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
PageSchema.index({ channelId: 1, slug: 1 }, { unique: true });
PageSchema.set('toJSON', SchemaToJson);
