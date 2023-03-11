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
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';
import { FindVideosDto } from './dto/find-videos.dto';
import { ChannelVideoAuthorizationGuard } from 'src/services/auth/guards/channel-video-authorization.guard';
import { PublishVideosDto } from './dto/publish-videos.dto';
import { UnpublishVideosDto } from './dto/unpublish-videos.dto';
import { UpdateVideoPagesDto } from './dto/update-video-pages';

@UseGuards(UserChannelAuthorizationGuard)
@UseGuards(JwtAuthGuard)
@Controller('channels/:channelId/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(
    @Param('channelId') channelId: string,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    return this.videosService.create(channelId, createVideoDto);
  }

  @Post('fetch')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('channelId') channelId: string,
    @Body() findVideosDto: FindVideosDto,
  ) {
    return this.videosService.findAll(channelId, findVideosDto);
  }

  @UseGuards(ChannelVideoAuthorizationGuard)
  @Get(':videoId')
  async findOne(
    @Param('channelId') channelId: string,
    @Param('videoId') videoId: string,
  ) {
    return await this.videosService.findOne(channelId, videoId);
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

  @Post('pages')
  @HttpCode(HttpStatus.ACCEPTED)
  updatePages(
    @Param('channelId') channelId: string,
    @Body() updateVideoPagesDto: UpdateVideoPagesDto,
  ) {
    this.videosService.updateVideoPages(channelId, updateVideoPagesDto);
  }
}
