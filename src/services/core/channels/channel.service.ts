import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDashboardDto } from './dto/update-channel.dto';
import { Channel, ChannelDoc } from './entities/channel.entity';
import { DoesSlugExistResponse } from './dto/does-slug-exist.response';
import { User } from 'src/services/users/entities/user.entity';
import { ChannelFactory } from './channel.factory';
import { Page, PageDoc } from '../pages/entities/page.entity';
import { PageFactory } from '../pages/pages.factory';
import { ChannelGeneralSettingsDto } from './dto/channel-general-settings.dto';
import { FindChannelsDto } from './dto/find-channels.dto';
import { ChannelNavbarDto } from './dto/channel-navbar-settings.dto';
import { channel } from 'diagnostics_channel';
import { PageService } from '../pages/pages.service';
import { PageType } from '../pages/enums/page-type.enum';
import { NotAcceptableException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import { ChannelAppearance } from './entities/classes/channel-appearance.class';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name)
    private channelModel: Model<ChannelDoc>,

    @InjectModel(Page.name)
    private pageModel: Model<PageDoc>,

    private pageService: PageService,

    @InjectConnection() private connection: Connection,
  ) {}

  async createChannel(createChannelDto: CreateChannelDto, user: User) {
    const session = await this.connection.startSession();

    session.startTransaction();
    try {
      createChannelDto.userId = user.id;

      const social = ChannelFactory.createDefaultChannelSocial();
      const appearance = ChannelFactory.createDefaultChannelAppearance();
      const seo = ChannelFactory.createDefaultChannelSEO();

      const createdChannel = new this.channelModel<Channel>({
        ...createChannelDto,
        social,
        appearance,
        seo,
      });

      const pages = PageFactory.createDefaultPages(createdChannel.id);

      const createdHomePage = new this.pageModel<Page>(pages[0]);
      const createdAboutPage = new this.pageModel<Page>(pages[1]);

      const navbar = ChannelFactory.createDefaultChannelNavbar(
        createdHomePage.id,
        createdAboutPage.id,
      );

      createdChannel.navbar = navbar;

      await createdChannel.save({ session });
      await createdHomePage.save({ session });
      await createdAboutPage.save({ session });

      await session.commitTransaction();

      return createdChannel;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findChannels(getChannelsDto: FindChannelsDto, user: User) {
    return;
  }

  async findOneByChannelId(channelId: string) {
    return (await this.channelModel.findOne({ _id: channelId })).toJSON();
  }

  async findChannelGeneralSettingsByChannelId(channelId: string) {
    return (
      await this.channelModel
        .findOne({ _id: channelId })
        .select({ appearance: 0, navbar: 0, seo: 0 })
    ).toJSON();
  }

  async updateChannelGeneralSettings(
    channelId: string,
    channelGeneralSettingsDto: ChannelGeneralSettingsDto,
  ) {
    return await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      channelGeneralSettingsDto,
    );
  }

  async findChannelNavbarSettings(id: string): Promise<{
    navbar: ChannelNavbarDto;
  }> {
    return (
      await this.channelModel.findOne({ _id: id }).select({ navbar: 1 })
    ).toJSON() as any;
  }

  async updateChannelNavbarSettings(
    channelId: string,
    channelNavbarDto: ChannelNavbarDto,
  ) {
    const navbar = channelNavbarDto.navbar;
    const homeNavItem = navbar[0];
    const aboutNavItem = navbar[navbar.length - 1];

    const defaultPages = await this.pageService.findAll(channelId, {
      pageTypes: [PageType.DEFAULT],
    });

    const homePage = defaultPages.find((page) => page.slug === 'home');
    const aboutPage = defaultPages.find((page) => page.slug === 'about');

    if (
      homeNavItem.pageId !== homePage.id ||
      aboutNavItem.pageId !== aboutPage.id
    ) {
      throw new NotAcceptableException(
        'Home and About navbar items cannot be changed',
      );
    }

    return await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      channelNavbarDto,
    );
  }

  async findChannelAppearanceSettings(id: string): Promise<{
    appearance: ChannelAppearance;
  }> {
    return (
      await this.channelModel.findOne({ _id: id }).select({ appearance: 1 })
    ).toJSON() as any;
  }

  async updateChannelAppearanceSettings(
    channelId: string,
    channelAppearanceDto: ChannelAppearance,
  ) {
    return await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      { appearance: channelAppearanceDto },
    );
  }

  async findChannelSeoSettings(id: string) {
    return (
      await this.channelModel.findOne({ _id: id }).select({ seo: 1 })
    ).toJSON()?.seo;
  }

  update(id: number, updateChannelDashboardDto: UpdateChannelDashboardDto) {
    return `This action updates a #${id} channelDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelDashboard`;
  }

  async doesSlugExist(slug: string): Promise<DoesSlugExistResponse> {
    const channel = await this.channelModel
      .findOne({ slug: slug })
      .select({ _id: 1 });

    if (channel) {
      return { doesSlugExist: true };
    }

    return { doesSlugExist: false };
  }
}
