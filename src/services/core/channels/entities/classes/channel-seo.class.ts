import { Prop } from '@nestjs/mongoose';

export class ChannelSEO {
  @Prop()
  displayTitle: string;

  @Prop()
  searchDescription: string;

  @Prop()
  sitemapURL: string;

  @Prop()
  socialMediaSharingImageURL: string;
}
