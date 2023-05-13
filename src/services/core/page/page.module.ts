import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageDashboardController } from './page-dashboard.controller';
import { Page, PageSchema } from './entities/page.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { PageController } from './page.controller';
import {
  VideoPage,
  VideoPageSchema,
} from '../video/entities/video-page.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Page.name, schema: PageSchema },
      { name: VideoPage.name, schema: VideoPageSchema },
    ]),
    GuardsModule,
  ],
  controllers: [PageDashboardController, PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
