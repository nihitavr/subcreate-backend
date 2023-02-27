import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { Currencies } from '../enums/currencies.enum';
import { SubscriptionGranularities } from '../enums/subscription-granularities.enum';

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Channel', required: true })
  channelId: ObjectId | string;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: true })
  title: string;

  benefits: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  currency: Currencies;

  @Prop({ required: true })
  granularity: SubscriptionGranularities;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
SubscriptionSchema.index({ channelId: 1 });
SubscriptionSchema.set('toJSON', SchemaToJson);
