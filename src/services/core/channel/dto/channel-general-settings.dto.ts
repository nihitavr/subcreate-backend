import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ChannelSocial } from '../entities/classes/channel-social.dto';

export class ChannelGeneralSettingsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  about: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ChannelSocial)
  social: ChannelSocial;
}
