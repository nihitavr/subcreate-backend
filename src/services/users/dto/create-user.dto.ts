import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';
import { REGEX } from 'src/lib/utils/regex.utils';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(REGEX.username)
  username: string;

  @IsUrl()
  photoURL: string;
}
