import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/services/common/dto/pagination.dto';

export class FindRecommendationDto extends PaginationDto {
  @IsString()
  videoSlug: string;

  @IsString()
  @IsOptional()
  pageSlug?: string;

  @IsString()
  channelSlug: string;
}
