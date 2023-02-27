import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { splitAndTrimString } from 'src/lib/utils/string.utils';
import { PageType } from '../enums/page-type.enum';

export class FindAllPagesDto {
  @IsEnum(PageType, { each: true })
  @Transform(({ value }) =>
    value ? splitAndTrimString(value) : Object.values(PageType),
  )
  pageTypes: PageType[];
}
