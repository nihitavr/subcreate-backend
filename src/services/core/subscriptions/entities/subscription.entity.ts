import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaToJson } from 'src/lib/utils/mongo.utils';
import { Currencies } from '../enums/currencies.enum';
import { SubscriptionGranularities } from '../enums/subscription-granularities.enum';

export class Subscription {
  @Prop({ required: true })
  channelId: string;

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
