import { Prop } from '@nestjs/mongoose';
import { NavbarItemType } from '../../enums/navbar-item-type.enum';

export class NavbarItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  itemType: NavbarItemType;

  @Prop({ required: true })
  isDefault: boolean;

  @Prop()
  pageId?: string;

  items?: NavbarItem[];
}
