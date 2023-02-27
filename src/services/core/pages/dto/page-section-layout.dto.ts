import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { PageSectionLayoutType } from '../enums/page-section-layout-type.enum';
import { PageSectionType } from '../enums/page-section-type.enum';

export class PageSectionLayout {
  @IsString()
  name: string;

  @IsBoolean()
  showName: boolean;

  @IsEnum(PageSectionType)
  sectionType: PageSectionType;

  @IsEnum(PageSectionLayoutType)
  layoutType?: PageSectionLayoutType;
}
