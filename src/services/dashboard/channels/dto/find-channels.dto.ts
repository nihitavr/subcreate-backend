import { IsIn, IsString } from 'class-validator';

export class FindChannelsDto {
  @IsIn(['created'])
  @IsString()
  type: string;
}
