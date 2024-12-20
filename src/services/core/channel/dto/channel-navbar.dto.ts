import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { NavbarItem } from '../entities/classes/navbar-item.dto';

export class ChannelNavbarDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NavbarItem)
  navbar: NavbarItem[];
}
