import { OutputBlockData } from '@editorjs/editorjs';
import { Allow, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @Allow()
  blocks: OutputBlockData[];

  @IsNumber()
  @IsOptional()
  time?: number;

  @IsString()
  @IsOptional()
  version?: string;
}
