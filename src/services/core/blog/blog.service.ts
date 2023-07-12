import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDoc } from './entities/blog.entity';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { stringUtils } from 'src/lib/utils';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDoc>,
    @InjectModel(Blog.name) private blockModel: Model<BlogDoc>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blog`;
  }

  async findOneById(id: string) {
    return (await this.blogModel.findById(id)).toJSON();
  }

  async findAllByIds(ids: string[]) {
    return toJSON(await this.blogModel.find({ _ids: { $in: ids } }));
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const polls = this.extractReferencedBlocks(updateBlogDto);

    // extract polls that dont have blogId
    const pollsWithoutBlogId = polls.polls.filter((poll) =>
      stringUtils.isEmpty(poll.blogId),
    );

    // extract polls that have blogId
    const pollsWithBlogId = polls.polls.filter(
      (poll) => !stringUtils.isEmpty(poll.blogId),
    );

    // create new poll block model
    const newPollBlockModels = pollsWithoutBlogId.map((poll) => {
      return new this.blockModel({
        ...poll,
        blogId: id,
      });
    });

    // update olds block models
    const oldPollBlockModels = pollsWithBlogId.map(async (poll) => {
      const block = { ...poll, blogId: id, id: '' };
      return this.blockModel.findOneAndUpdate(
        { _id: poll.blockId },
        { ...poll, blogId: id },
      );

      // Remove poll blocks from updateBlogDto using po and add blogId to poll blocks

      return (
        await this.blogModel.findOneAndUpdate(
          { _id: id },
          { editorData: updateBlogDto },
        )
      ).toJSON();
    });
  }

  extractReferencedBlocks(updateBlogDto: any) {
    const blocks = updateBlogDto.blocks.map((block, idx) => {
      block.blockIndex = idx;
      return block;
    });

    const polls = blocks.filter((block) => block.type === 'poll');

    return { polls };
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
