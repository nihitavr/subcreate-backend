import { Post, HttpCode, HttpStatus, Body, Controller } from '@nestjs/common';
import { VideosService } from './videos.service';
import { FindVideosByFiltersDto } from './dto/find-videos-by-filters.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('fetch')
  @HttpCode(HttpStatus.OK)
  findChannelVideosByFilters(
    @Body() findChannelVideosByFiltersDto: FindVideosByFiltersDto,
  ) {
    return this.videosService.findVideosByFilters(
      findChannelVideosByFiltersDto,
    );
  }
}
