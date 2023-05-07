import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/request/create-video.dto';
import { UpdateVideoDto } from './dto/request/update-video.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';
import { ChannelVideoAuthorizationGuard } from 'src/services/auth/guards/channel-video-authorization.guard';
import { PublishVideosDto } from './dto/request/publish-videos.dto';
import { UnpublishVideosDto } from './dto/request/unpublish-videos.dto';
import { UpdateVideoPagesDto } from './dto/request/update-video-pages';
import { FindChannelVideosByFiltersDto } from './dto/request/find-channel-videos-by-filters.dto';

// @UseGuards(UserChannelAuthorizationGuard)
// @UseGuards(JwtAuthGuard)
@Controller('dashboard/channels/:channelId/videos')
export class VideoDashboardController {
  constructor(private readonly videosService: VideoService) {}

  // @Post()
  // create(
  //   @Param('channelId') channelId: string,
  //   @Body() createVideoDto: CreateVideoDto,
  // ) {
  //   return this.videosService.create(channelId, createVideoDto);
  // }

  @Post('fetch')
  @HttpCode(HttpStatus.OK)
  findChannelVideosByFilters(
    @Param('channelId') channelId: string,
    @Body() findChannelVideosByFiltersDto: FindChannelVideosByFiltersDto,
  ) {
    return this.videosService.findChannelVideosByFilters(
      channelId,
      findChannelVideosByFiltersDto,
    );
  }

  @UseGuards(ChannelVideoAuthorizationGuard)
  @Get(':videoId')
  async findOne(
    @Param('channelId') channelId: string,
    @Param('videoId') videoId: string,
  ) {
    return await this.videosService.findOne(channelId, videoId);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  findChannelVideosByFiltersList(
    @Param('channelId') channelId: string,
    @Query() findChannelVideosByFiltersDto: FindChannelVideosByFiltersDto,
  ) {
    return this.videosService.findChannelVideosByFilters(
      channelId,
      findChannelVideosByFiltersDto,
    );
  }

  @Patch(':videoId')
  @UseGuards(ChannelVideoAuthorizationGuard)
  update(
    @Param('videoId') videoId: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videosService.update(videoId, updateVideoDto);
  }

  @Delete(':videoId')
  @UseGuards(ChannelVideoAuthorizationGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('videoId') videoId: string) {
    this.videosService.remove(videoId);
  }

  @Post('pages')
  @HttpCode(HttpStatus.ACCEPTED)
  updatePages(
    @Param('channelId') channelId: string,
    @Body() updateVideoPagesDto: UpdateVideoPagesDto,
  ) {
    this.videosService.updateVideoPages(channelId, updateVideoPagesDto);
  }

  @Post('publish')
  @HttpCode(HttpStatus.ACCEPTED)
  publish(
    @Param('channelId') channelId: string,
    @Body() publishVideos: PublishVideosDto,
  ) {
    this.videosService.publishVideos(channelId, publishVideos);
  }

  @Post('unpublish')
  @HttpCode(HttpStatus.ACCEPTED)
  unpublish(
    @Param('channelId') channelId: string,
    @Body() unpublishVideos: UnpublishVideosDto,
  ) {
    this.videosService.unpublishVideos(channelId, unpublishVideos);
  }
}
