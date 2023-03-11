import { IsNotEmptyObject, IsString } from 'class-validator';

export class UnpublishVideosDto {
  @IsNotEmptyObject()
  @IsString({ each: true })
  videoIds: string[];
}
