import { IsOptional, IsUrl } from 'class-validator';

export class ChannelSocial {
  @IsUrl()
  @IsOptional()
  youtube: string;

  @IsUrl()
  @IsOptional()
  twitter: string;

  @IsUrl()
  @IsOptional()
  instagram: string;

  @IsUrl()
  @IsOptional()
  facebook: string;

  @IsUrl()
  @IsOptional()
  github: string;
}
