import { IsString } from 'class-validator';

export class UnpublishVideosDto {
  @IsString({ each: true })
  videoIds: string[];
}
