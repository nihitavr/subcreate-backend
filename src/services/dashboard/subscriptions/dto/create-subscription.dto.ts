import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { Currencies } from '../enums/currencies.enum';
import { SubscriptionGranularities } from '../enums/subscription-granularities.enum';

export class CreateSubscriptionDto {
  channelId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @ValidateIf((o) => o.imageURL)
  imageURL: string;

  @IsString({ each: true })
  benefits: string[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(Currencies)
  currency: Currencies;

  @IsEnum(SubscriptionGranularities)
  granularity: SubscriptionGranularities;
}
