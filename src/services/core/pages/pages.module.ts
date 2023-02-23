import { Module } from '@nestjs/common';
import { PageService } from './pages.service';
import { PageController } from './pages.controller';
import { Page, PageSchema } from './entities/page.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
