import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './pages.service';
import { FindPagesByFiltersDto } from './dto/find-pages-by-filters';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  findPagesByFilters(@Query() findPagesByFilters: FindPagesByFiltersDto) {
    return this.pageService.findPagesByFilters(findPagesByFilters);
  }
}
