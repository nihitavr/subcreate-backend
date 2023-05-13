import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { DoesSlugExistResponse } from '../channel/dto/does-slug-exist.response';
import { CreatePageDto } from './dto/create-page.dto';
import { FindChannelPagesByFiltersDto } from './dto/find-channel-pages-by-filters.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page, PageDoc } from './entities/page.entity';
import { FindPagesByFiltersDto } from './dto/find-pages-by-filters';
import { VideoPage, VideoPageDoc } from '../video/entities/video-page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private pageModel: Model<PageDoc> & SoftDeleteModel<PageDoc>,
    @InjectModel(VideoPage.name)
    private videoPageModel: Model<VideoPageDoc> & SoftDeleteModel<VideoPageDoc>,
  ) {}

  async create(channelId: string, createPageDto: CreatePageDto) {
    const createdPage = new this.pageModel<Page>(createPageDto);
    createdPage.channelId = channelId;

    return await createdPage.save();
  }

  async findPagesByFilters(
    findPagesByFilters: FindPagesByFiltersDto,
  ): Promise<Page[]> {
    return (
      await this.pageModel.find(findPagesByFilters).sort({ createdAt: 1 })
    ).map(toJSON);
  }

  async findChannelPagesByFilters(
    channelId: string,
    findAllPages: FindChannelPagesByFiltersDto,
  ): Promise<Page[]> {
    return (
      await this.pageModel
        .find({
          channelId,
          type: { $in: findAllPages.pageTypes },
        })
        .sort({ createdAt: 1 })
    ).map(toJSON);
  }

  async findOne(channelId: string, pageId: string) {
    const page = (
      await this.pageModel.findOne({
        _id: pageId,
        channelId,
      })
    )?.toJSON();

    return page;
  }

  update(pageId: string, updatePageDto: UpdatePageDto) {
    return this.pageModel.findOneAndUpdate({ _id: pageId }, updatePageDto, {
      new: true,
    });
  }

  async remove(pageId: string, channelId: string) {
    // Delete page
    await this.pageModel.delete({ _id: pageId, channelId: channelId });

    // Delete videoPages for the page
    await this.videoPageModel.delete({ pageId, channelId });
  }

  async doesSlugExist(
    channelId: string,
    slug: string,
  ): Promise<DoesSlugExistResponse> {
    const page = await this.pageModel.exists({ channelId, slug });

    if (page) {
      return { doesSlugExist: true, id: page._id?.toString() };
    }

    return { doesSlugExist: false };
  }

  async existsAll(channelId: string, pageIds: string[]) {
    return (
      await this.pageModel
        .find({ channelId, _id: { $in: pageIds } })
        .select('_id')
    ).map(toJSON);
  }
}
