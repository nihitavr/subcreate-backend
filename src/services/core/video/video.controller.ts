import {
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Controller,
  Get,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FindVideosByFiltersDto } from './dto/request/find-videos-by-filters.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videosService: VideoService) {}

  @Post('fetch')
  @HttpCode(HttpStatus.OK)
  findChannelVideosByFilters(
    @Body() findChannelVideosByFiltersDto: FindVideosByFiltersDto,
  ) {
    return this.videosService.findVideosByFilters(
      findChannelVideosByFiltersDto,
    );
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  findChannelVideosByFiltersList(
    @Query() findChannelVideosByFiltersDto: FindVideosByFiltersDto,
  ) {
    return this.videosService.findVideosByFilters(
      findChannelVideosByFiltersDto,
    );
  }
}
