import { Prop } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class ChannelSEO {
  @Prop()
  @IsString()
  @IsNotEmpty()
  displayTitle: string;

  @Prop()
  sitemapURL: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  searchDescription: string;

  @Prop()
  @IsUrl()
  @ValidateIf((o) => o.socialMediaSharingImageURL)
  socialMediaSharingImageURL: string;
}
