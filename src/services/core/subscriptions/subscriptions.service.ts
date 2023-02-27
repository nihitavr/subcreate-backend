import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { toJSON } from 'src/lib/utils/mongo.utils';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription, SubscriptionDoc } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDoc> &
      SoftDeleteModel<SubscriptionDoc>,
  ) {}

  async createSubscription(
    channelId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    createSubscriptionDto.channelId = channelId;

    const createdSubscription = new this.subscriptionModel<Subscription>(
      createSubscriptionDto,
    );

    await createdSubscription.save();

    return createdSubscription.toJSON();
  }

  async findAll(channelId: string) {
    return (await this.subscriptionModel.find({ channelId })).map(toJSON);
  }

  async findOne(subscriptionId: string) {
    return (
      await this.subscriptionModel.findOne({ _id: subscriptionId })
    ).toJSON();
  }

  async update(
    subscriptionId: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionModel.findOneAndUpdate(
      { _id: subscriptionId },
      updateSubscriptionDto,
    );
  }

  async remove(subscriptionId: string) {
    await this.subscriptionModel.deleteById(subscriptionId);
  }
}
