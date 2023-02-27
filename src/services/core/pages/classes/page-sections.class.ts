import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PageSectionLayout } from './page-section-layout.class';

export class PageSections {
  @Prop()
  @ValidateNested()
  @Type(() => PageSectionLayout)
  main: PageSectionLayout;

  @Prop()
  @ValidateNested({ each: true })
  @Type(() => PageSectionLayout)
  @IsOptional()
  secondary?: PageSectionLayout[];
}
