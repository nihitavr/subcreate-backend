import { Allow, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @Allow()
  blocks: any;

  @IsNumber()
  time?: number;

  @IsString()
  version?: string;
}
