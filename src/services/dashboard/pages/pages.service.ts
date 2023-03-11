import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { DoesSlugExistResponse } from '../channels/dto/does-slug-exist.response';
import { CreatePageDto } from './dto/create-page.dto';
import { FindAllPagesDto } from './dto/find-all-pages.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page, PageDoc } from './entities/page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private pageModel: Model<PageDoc> & SoftDeleteModel<PageDoc>,
  ) {}

  async create(channelId: string, createPageDto: CreatePageDto) {
    const createdPage = new this.pageModel<Page>(createPageDto);
    createdPage.channelId = channelId;

    return await createdPage.save();
  }

  async findAll(
    channelId: string,
    findAllPages: FindAllPagesDto,
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

  async remove(pageId: string) {
    await this.pageModel.deleteById(pageId);
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
