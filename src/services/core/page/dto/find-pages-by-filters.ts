import { IsOptional, IsString } from 'class-validator';

export class FindPagesByFiltersDto {
  @IsString()
  channelId: string;

  @IsString()
  @IsOptional()
  slug: string;
}
