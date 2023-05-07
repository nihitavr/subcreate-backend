import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from 'src/lib/entities/pagination.dto';

export class FindVideosFilter {
  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  channelId: string;

  @IsString()
  @IsOptional()
  pageId: string | any;

  pageIds: string[] | any;

  _id?: { $in: any[] };
}

export class FindVideosSort {
  @IsIn([1, -1])
  @IsOptional()
  publishedAt: 1 | -1;
}

export class FindVideosByFiltersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindVideosFilter)
  filters: FindVideosFilter;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindVideosSort)
  sort: FindVideosSort;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}
