import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { NavbarItemType } from '../../enums/navbar-item-type.enum';

export class NavbarItem {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsEnum(NavbarItemType)
  itemType: NavbarItemType;

  @Prop({ required: true, default: false })
  @IsBoolean()
  isDefault: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.itemType === NavbarItemType.PAGE)
  pageId: string;

  @Prop()
  @ValidateNested({ each: true })
  @Type(() => NavbarItem)
  @ValidateIf((o) => o.itemType === NavbarItemType.DROPDOWN)
  @IsOptional()
  items?: NavbarItem[];
}
