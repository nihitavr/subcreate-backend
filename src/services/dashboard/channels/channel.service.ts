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
import { ChannelNavbarDto } from './dto/channel-navbar.dto';
import { PageService } from '../pages/pages.service';
import { PageType } from '../pages/enums/page-type.enum';
import { NotAcceptableException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import { ChannelAppearance } from './entities/classes/channel-appearance.dto';
import { YoutubeService } from 'src/services/youtube/youtube.service';
import { VideoFactory } from '../videos/video.factory';
import { Video, VideoDoc } from '../videos/entities/video.entity';
import { toJSON } from 'src/lib/utils/mongo.utils';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDoc>,
    @InjectModel(Page.name) private pageModel: Model<PageDoc>,
    @InjectModel(Video.name) private videoModel: Model<VideoDoc>,
    @InjectConnection() private connection: Connection,
    private pageService: PageService,
    private youtubeService: YoutubeService,
  ) {}

  async createChannel(createChannelDto: CreateChannelDto, user: User) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Set the user ID for the channel
      createChannelDto.userId = user.id;

      // Create default settings for social, appearance, and SEO
      const social = ChannelFactory.createDefaultChannelSocial();
      const appearance = ChannelFactory.createDefaultChannelAppearance();
      const seo = ChannelFactory.createDefaultChannelSEO();

      // Create a new channel model instance with the given settings
      const createdChannel = new this.channelModel<Channel>({
        ...createChannelDto,
        social,
        appearance,
        seo,
      });

      // Fetch the channel's videos from YouTube
      const youtubeVideos = await this.youtubeService.fetchChannelVideos(
        createChannelDto.youtubeChannelId,
      );

      // Create video models from the YouTube videos.
      const videos = VideoFactory.createYoutubeVideos(
        createdChannel.id,
        youtubeVideos,
      );

      // Create default pages for the channel
      const defaultPages = PageFactory.createDefaultPages(createdChannel.id);
      const [createdHomePage, createdAboutPage] = defaultPages.map(
        (page) => new this.pageModel<Page>(page),
      );

      // Create the default channel navbar with links to the home and about pages
      const navbar = ChannelFactory.createDefaultChannelNavbar(
        createdHomePage.id,
        createdAboutPage.id,
      );

      createdChannel.navbar = navbar;

      // Save the channel, home page, about page, and videos to the database
      await createdChannel.save({ session });
      await createdHomePage.save({ session });
      await createdAboutPage.save({ session });
      await this.videoModel.insertMany(videos);

      await session.commitTransaction();

      return createdChannel.toJSON();
    } catch (error) {
      // Abort the transaction if an error occurs
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findChannels(findChannelsDto: FindChannelsDto) {
    return toJSON(await this.channelModel.find(findChannelsDto));
  }

  async findOneByChannelId(channelId: string) {
    return (await this.channelModel.findOne({ _id: channelId })).toJSON();
  }

  async findOneBySlug(slug: string) {
    return (await this.channelModel.findOne({ slug: slug })).toJSON();
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
      { new: true },
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

    // Find all default pages for the channel
    const defaultPages = await this.pageService.findAll(channelId, {
      pageTypes: [PageType.DEFAULT],
    });

    // Find the home and about pages
    const homePage = defaultPages.find((page) => page.slug === 'home');
    const aboutPage = defaultPages.find((page) => page.slug === 'about');

    // Check if home and about navbar items have changed, throw an exception if they have.
    if (
      homeNavItem.pageId !== homePage.id ||
      aboutNavItem.pageId !== aboutPage.id
    ) {
      throw new NotAcceptableException(
        'Home and About navbar items cannot be changed',
      );
    }

    // Update the channel with the new navbar settings and return the updated channel
    return await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      channelNavbarDto,
      { new: true },
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
      { new: true },
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
