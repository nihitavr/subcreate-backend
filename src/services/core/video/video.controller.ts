import {
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FindVideosByFiltersDto } from './dto/request/find-videos-by-filters.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videosService: VideoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getVideos(
    @Query('slug') slug: string,
    @Query('channelId') channelId: string,
  ) {
    return this.videosService.findVideo(channelId, slug);
  }

  @Post('fetch')
  @HttpCode(HttpStatus.OK)
  fetchChannelVideos(
    @Body() findChannelVideosByFiltersDto: FindVideosByFiltersDto,
  ) {
    return this.videosService.findVideosByFilters(
      findChannelVideosByFiltersDto,
    );
  }
}
