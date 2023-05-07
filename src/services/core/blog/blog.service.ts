import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDoc } from './entities/blog.entity';
import { toJSON } from 'src/lib/utils/mongo.utils';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDoc>) {}

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
    return (
      await this.blogModel.findOneAndUpdate(
        { _id: id },
        { editorData: updateBlogDto },
      )
    ).toJSON();
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
