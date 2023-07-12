import { Controller, Get, Query } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { FindRecommendationDto } from './dto/find-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  findAll(@Query() findRecommendationDto: FindRecommendationDto) {
    return this.recommendationService.findAll(findRecommendationDto);
  }
}
