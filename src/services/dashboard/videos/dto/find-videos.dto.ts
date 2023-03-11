import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from 'src/lib/entities/pagination.dto';

export class FindVideosFilter {
  @IsBoolean()
  isPublished: boolean;
}

export class FindVideosSort {
  @IsIn([1, -1])
  @IsOptional()
  publishedAt: 1 | -1;

  @IsIn([1, -1])
  @IsOptional()
  createdAt: 1 | -1;
}

export class FindVideosDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindVideosFilter)
  filter: FindVideosFilter;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindVideosSort)
  sort: FindVideosSort;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}
