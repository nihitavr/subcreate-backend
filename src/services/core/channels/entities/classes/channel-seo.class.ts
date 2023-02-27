import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

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
  @IsOptional()
  socialMediaSharingImageURL: string;
}
