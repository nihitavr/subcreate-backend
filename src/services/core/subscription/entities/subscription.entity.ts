import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { BaseEntity } from 'src/services/common/entities/base-entity';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { Currencies } from '../enums/currencies.enum';
import { SubscriptionGranularities } from '../enums/subscription-granularities.enum';

export type SubscriptionDoc = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription extends BaseEntity {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId: ObjectId | string;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  benefits: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  currency: Currencies;

  @Prop({ required: true })
  granularity: SubscriptionGranularities;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
SubscriptionSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});
SubscriptionSchema.index({ channelId: 1 });
SubscriptionSchema.set('toJSON', SchemaToJson);
