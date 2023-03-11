import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorisedException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import {
  Page,
  PageDoc,
} from 'src/services/dashboard/pages/entities/page.entity';

@Injectable()
export class ChannelPageAuthorizationGuard implements CanActivate {
  constructor(
    @InjectModel(Page.name)
    private pageModel: Model<PageDoc>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const channelId = request.params.channelId;
    const pageId = request.params.pageId;

    if (!channelId || !pageId) {
      throw new UnauthorisedException('Page not found for the channel');
    }

    const isChannelPage = await this.pageModel.exists({
      _id: pageId,
      channelId: channelId,
    });

    if (!isChannelPage) {
      throw new UnauthorisedException('Page not found for the channel');
    }

    return true;
  }
}
