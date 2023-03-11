import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PageService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { ChannelPageAuthorizationGuard } from 'src/services/auth/guards/channel-page-authorization.guard';
import { FindAllPagesDto } from './dto/find-all-pages.dto';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';

@UseGuards(UserChannelAuthorizationGuard)
@UseGuards(JwtAuthGuard)
@Controller('channels/:channelId/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(
    @Param('channelId') channelId: string,
    @Body() createPageDto: CreatePageDto,
  ) {
    return this.pageService.create(channelId, createPageDto);
  }

  @Get()
  findAll(
    @Param('channelId') channelId: string,
    @Query() findAllPages: FindAllPagesDto,
  ) {
    return this.pageService.findAll(channelId, findAllPages);
  }

  @UseGuards(ChannelPageAuthorizationGuard)
  @Get(':pageId')
  findOne(
    @Param('channelId') channelId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.pageService.findOne(channelId, pageId);
  }

  @UseGuards(ChannelPageAuthorizationGuard)
  @Patch(':pageId')
  update(
    @Param('pageId') pageId: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pageService.update(pageId, updatePageDto);
  }

  @Delete(':pageId')
  @UseGuards(ChannelPageAuthorizationGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('pageId') pageId: string) {
    return this.pageService.remove(pageId);
  }

  @Get('does-slug-exist')
  doesUsernameExist(
    @Param('channelId') channelId: string,
    @Query('slug') slug: string,
  ) {
    return this.pageService.doesSlugExist(channelId, slug);
  }
}
