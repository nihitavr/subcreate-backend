import { Prop } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Thumbnails } from '../../entities/video.entity';

export class CreateVideoDto {
  channelId: ObjectId | string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  durationInSecs: number;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsOptional()
  thumbnails: Thumbnails;

  @IsUrl()
  @ValidateIf((o) => o.originalURL)
  @IsOptional()
  originalURL: string;

  @IsBoolean()
  @IsOptional()
  isYoutubeURL: boolean;

  @IsString({ each: true })
  @IsOptional()
  subscriptionIds: ObjectId[] | string[];

  @Prop({ default: false })
  @IsOptional()
  isPublished: boolean;

  @Prop({ default: false })
  @IsOptional()
  isFileUploaded: boolean;
}
