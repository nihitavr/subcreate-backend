import { Prop } from '@nestjs/mongoose';

export class ChannelSocial {
  @Prop()
  youtube: string;

  @Prop()
  twitter: string;

  @Prop()
  instagram: string;

  @Prop()
  facebook: string;

  @Prop()
  github: string;
}
