import { Prop } from '@nestjs/mongoose';
import { Allow, Matches } from 'class-validator';
import { REGEX } from 'src/lib/utils/regex.utils';

export class ChannelSocial {
  @Prop()
  @Allow()
  @Matches(REGEX.youtubeURL)
  youtube: string;

  @Prop()
  @Allow()
  @Matches(REGEX.twitterURL)
  twitter: string;

  @Prop()
  @Allow()
  @Matches(REGEX.instagramURL)
  instagram: string;

  @Prop()
  @Allow()
  @Matches(REGEX.facebookURL)
  facebook: string;

  @Prop()
  @Allow()
  @Matches(REGEX.githubURL)
  github: string;
}
