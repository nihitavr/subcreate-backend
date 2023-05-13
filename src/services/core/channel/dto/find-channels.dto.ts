import { IsOptional, IsString } from 'class-validator';

export class FindChannelsDto {
  @IsString()
  @IsOptional()
  slug: string;
}
