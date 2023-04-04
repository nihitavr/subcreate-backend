import { IsIn, IsOptional, IsString } from 'class-validator';

export class FindChannelsDto {
  @IsIn(['created'])
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  slug: string;
}
