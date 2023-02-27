import { Page } from './entities/page.entity';
import { PageSectionLayoutType } from './enums/page-section-layout-type.enum';
import { PageSectionType } from './enums/page-section-type.enum';
import { PageType } from './enums/page-type.enum';

export class PageFactory {
  // create default pages
  static createDefaultPages(channelId: string): Page[] {
    return [
      {
        channelId: channelId,
        title: 'Home',
        description: '',
        slug: 'home',
        type: PageType.DEFAULT,
        seo: {
          searchDescription: '',
          socialMediaSharingImageURL: '',
        },
        sections: {
          main: {
            name: 'Videos',
            showName: true,
            sectionType: PageSectionType.ALL_VIDEOS,
            layoutType: PageSectionLayoutType.Grid4x2,
          },
          secondary: [
            {
              name: 'Pages',
              showName: false,
              sectionType: PageSectionType.ALL_PAGES,
              layoutType: PageSectionLayoutType.Grid4x1,
            },
          ],
        },
      },
      {
        channelId: channelId,
        title: 'About',
        description: '',
        slug: 'about',
        type: PageType.DEFAULT,
        seo: {
          searchDescription: '',
          socialMediaSharingImageURL: '',
        },
        sections: {
          main: {
            name: 'About',
            showName: false,
            sectionType: PageSectionType.ABOUT,
          },
        },
      },
    ];
  }
}
