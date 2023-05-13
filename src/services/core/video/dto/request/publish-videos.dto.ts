import { IsString } from 'class-validator';

export class PublishVideosDto {
  @IsString({ each: true })
  videoIds: string[];
}
