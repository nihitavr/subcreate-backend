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
import { PageSections } from '../classes/page-sections.class';
import { PageSeo } from '../classes/page-seo.class';
import { PageType } from '../enums/page-type.enum';

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

  @ValidateNested()
  @Type(() => PageSections)
  @IsNotEmptyObject()
  sections: PageSections;
}
