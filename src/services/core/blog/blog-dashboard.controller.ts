import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('dashboard/channels/:channelId/blogs')
export class BlogDasboardController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
