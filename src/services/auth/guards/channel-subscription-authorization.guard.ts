import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorisedException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import {
  Subscription,
  SubscriptionDoc,
} from 'src/services/core/subscription/entities/subscription.entity';

@Injectable()
export class ChannelSubscriptionAuthorizationGuard implements CanActivate {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDoc>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const channelId = request.params.channelId;
    const subscriptionId = request.params.subscriptionId;

    if (!channelId || !subscriptionId) {
      throw new UnauthorisedException('Subscription not found for the channel');
    }

    const isChannelSubscription = await this.subscriptionModel.exists({
      _id: subscriptionId,
      channelId: channelId,
    });

    if (!isChannelSubscription) {
      throw new UnauthorisedException('Subscription not found for the channel');
    }

    return true;
  }
}
