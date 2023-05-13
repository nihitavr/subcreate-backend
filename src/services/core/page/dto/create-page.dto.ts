import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { REGEX } from 'src/lib/utils/regex.utils';
import { PageSections } from './page-sections.dto';
import { PageSeo } from './page-seo.dto';
import { PageType } from '../enums/page-type.enum';
import { PageSectionLayout } from './page-section-layout.dto';

export class CreatePageDto {
  channelId?: ObjectId | string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @Matches(REGEX.slug)
  slug: string;

  @IsEnum(PageType)
  type: PageType;

  @ValidateNested()
  @Type(() => PageSeo)
  @IsNotEmptyObject()
  seo: PageSeo;

  @ValidateNested({ each: true })
  @Type(() => PageSectionLayout)
  sections: PageSectionLayout[];

  videoIds = [];
}
