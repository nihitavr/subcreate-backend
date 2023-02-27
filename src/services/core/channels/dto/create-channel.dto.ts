import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { REGEX } from 'src/lib/utils/regex.utils';
import { ChannelSocial } from '../entities/classes/channel-social.dto';

export class CreateChannelDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(REGEX.slug)
  slug: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  about?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ChannelSocial)
  @IsOptional()
  social?: ChannelSocial;
}
