import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ChannelSeoDto {
  @IsString()
  @IsNotEmpty()
  displayTitle: string;

  @IsString()
  @IsNotEmpty()
  searchDescription: string;

  @IsUrl()
  @IsOptional()
  socialMediaSharingImageURL: string;
}
