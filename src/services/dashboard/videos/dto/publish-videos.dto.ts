import { IsNotEmptyObject, IsString } from 'class-validator';

export class PublishVideosDto {
  @IsNotEmptyObject()
  @IsString({ each: true })
  videoIds: string[];
}
