import { Prop } from '@nestjs/mongoose';

export class ChannelAppearance {
  @Prop({ required: true })
  channelId: string;

  @Prop({ required: true })
  headerColor: string;

  @Prop({ required: true })
  headerColorDark: string;

  @Prop({ required: true })
  primaryColor: string;

  @Prop({ required: true })
  primaryColorDark: string;

  @Prop({ required: true })
  backgroundColor: string;

  @Prop({ required: true })
  backgroundColorDark: string;

  @Prop()
  logoURL: string;

  @Prop()
  logoURLDark: string;

  @Prop()
  thumbnailURL: string;

  @Prop()
  thumbnailURLDark: string;

  @Prop({ default: true })
  showVideoViewsOnHomepage: boolean;

  @Prop({ default: true })
  showVideoLikesOnHomepage: boolean;
}
