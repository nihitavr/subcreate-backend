import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from 'src/lib/entities/pagination.dto';

export class FindChannelVideosFilter {
  @IsBoolean()
  isPublished: boolean;
}

export class FindChannelVideosSort {
  @IsIn([1, -1])
  @IsOptional()
  publishedAt: 1 | -1;

  @IsIn([1, -1])
  @IsOptional()
  createdAt: 1 | -1;
}

export class FindChannelVideosByFiltersDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindChannelVideosFilter)
  filter: FindChannelVideosFilter;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => FindChannelVideosSort)
  sort: FindChannelVideosSort;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}
