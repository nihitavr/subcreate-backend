import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class VideoPages {
  @IsString()
  videoId: string;

  @IsString({ each: true })
  pageIds: string[];
}

export class UpdateVideoPagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoPages)
  videoPages: VideoPages[];
}
