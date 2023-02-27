import { IsString, IsUrl, ValidateIf } from 'class-validator';

export class PageSeo {
  @IsString()
  searchDescription: string;

  @IsUrl()
  @ValidateIf((o) => o.socialMediaSharingImageURL)
  socialMediaSharingImageURL: string;
}
