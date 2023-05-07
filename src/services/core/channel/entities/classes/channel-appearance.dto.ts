import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsUrl, Matches, ValidateIf } from 'class-validator';
import { REGEX } from 'src/lib/utils/regex.utils';

export class ChannelAppearance {
  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  headerColor: string;

  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  headerColorDark: string;

  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  primaryColor: string;

  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  primaryColorDark: string;

  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  backgroundColor: string;

  @Prop({ required: true })
  @Matches(REGEX.hexCode)
  backgroundColorDark: string;

  @Prop()
  @IsUrl()
  @ValidateIf((o) => o.logoURL)
  logoURL: string;

  @Prop()
  @IsUrl()
  @ValidateIf((o) => o.logoURLDark)
  logoURLDark: string;

  @Prop()
  @IsUrl()
  @ValidateIf((o) => o.thumbnailURL)
  thumbnailURL: string;

  @Prop()
  @IsUrl()
  @ValidateIf((o) => o.thumbnailURLDark)
  thumbnailURLDark: string;

  @Prop({ default: true })
  @IsBoolean()
  showVideoViewsOnHomepage: boolean;

  @Prop({ default: true })
  @IsBoolean()
  showVideoLikesOnHomepage: boolean;
}
