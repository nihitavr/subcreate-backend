import { ChannelAppearance } from './entities/classes/channel-appearance.dto';
import { ChannelSEO } from './entities/classes/channel-seo.dto';
import { NavbarItem } from './entities/classes/navbar-item.dto';
import { NavbarItemType } from './enums/navbar-item-type.enum';
import { ChannelSocial } from './entities/classes/channel-social.dto';
import { CHANNEL_SETTINGS } from './constants/channel.constants';

export class ChannelFactory {
  static createDefaultChannelSocial(): ChannelSocial {
    return {
      youtube: '',
      twitter: '',
      instagram: '',
      facebook: '',
      github: '',
    };
  }

  static createDefaultChannelAppearance(): ChannelAppearance {
    return {
      headerColor: CHANNEL_SETTINGS.defaultHeaderColor,
      headerColorDark: CHANNEL_SETTINGS.defaultHeaderColorDark,
      primaryColor: CHANNEL_SETTINGS.defaultPrimaryColor,
      primaryColorDark: CHANNEL_SETTINGS.defaultPrimaryColorDark,
      backgroundColor: CHANNEL_SETTINGS.defaultBackgroundColor,
      backgroundColorDark: CHANNEL_SETTINGS.defaultBackgroundColorDark,
      logoURL: '',
      logoURLDark: '',
      thumbnailURL: '',
      thumbnailURLDark: '',
      showVideoViewsOnHomepage: true,
      showVideoLikesOnHomepage: true,
    };
  }

  static createDefaultChannelNavbar(
    homePageId: string,
    aboutPageId: string,
  ): NavbarItem[] {
    return [
      {
        itemType: NavbarItemType.PAGE,
        name: 'Home',
        isDefault: true,
        pageId: homePageId,
      },
      {
        itemType: NavbarItemType.PAGE,
        name: 'About',
        isDefault: true,
        pageId: aboutPageId,
      },
    ];
  }

  static createDefaultChannelSEO(): ChannelSEO {
    return {
      displayTitle: '',
      searchDescription: '',
      sitemapURL: '',
      socialMediaSharingImageURL: '',
    };
  }
}
