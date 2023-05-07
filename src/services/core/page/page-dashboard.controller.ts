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
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { ChannelPageAuthorizationGuard } from 'src/services/auth/guards/channel-page-authorization.guard';
import { FindChannelPagesByFiltersDto } from './dto/find-channel-pages-by-filters.dto';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';

@UseGuards(UserChannelAuthorizationGuard)
@UseGuards(JwtAuthGuard)
@Controller('dashboard/channels/:channelId/pages')
export class PageDashboardController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(
    @Param('channelId') channelId: string,
    @Body() createPageDto: CreatePageDto,
  ) {
    return this.pageService.create(channelId, createPageDto);
  }

  @Get()
  findChannelPagesByFilters(
    @Param('channelId') channelId: string,
    @Query() findAllPages: FindChannelPagesByFiltersDto,
  ) {
    return this.pageService.findChannelPagesByFilters(channelId, findAllPages);
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
  remove(
    @Param('channelId') channelId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.pageService.remove(pageId, channelId);
  }

  @Get('does-slug-exist')
  doesUsernameExist(
    @Param('channelId') channelId: string,
    @Query('slug') slug: string,
  ) {
    return this.pageService.doesSlugExist(channelId, slug);
  }
}
