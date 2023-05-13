import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { BlogDasboardController } from './blog-dashboard.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController, BlogDasboardController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
