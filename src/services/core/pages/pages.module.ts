import { Module } from '@nestjs/common';
import { PageService } from './pages.service';
import { PageDashboardController } from './pages-dashboard.controller';
import { Page, PageSchema } from './entities/page.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardsModule } from 'src/services/auth/guards/guards.module';
import { PageController } from './pages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    GuardsModule,
  ],
  controllers: [PageDashboardController, PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
