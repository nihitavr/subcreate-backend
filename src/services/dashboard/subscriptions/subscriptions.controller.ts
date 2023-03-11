import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SubscriptionService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';
import { ChannelSubscriptionAuthorizationGuard } from 'src/services/auth/guards/channel-subscription-authorization.guard';

@UseGuards(UserChannelAuthorizationGuard)
@UseGuards(JwtAuthGuard)
@Controller('channels/:channelId/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionsService: SubscriptionService) {}

  @Post()
  create(
    @Param('channelId') channelId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionsService.createSubscription(
      channelId,
      createSubscriptionDto,
    );
  }

  @Get()
  findAll(@Param('channelId') channelId: string) {
    return this.subscriptionsService.findAll(channelId);
  }

  @UseGuards(ChannelSubscriptionAuthorizationGuard)
  @Get(':subscriptionId')
  findOne(@Param('subscriptionId') subscriptionId: string) {
    return this.subscriptionsService.findOne(subscriptionId);
  }

  @UseGuards(ChannelSubscriptionAuthorizationGuard)
  @Patch(':subscriptionId')
  update(
    @Param('subscriptionId') subscriptionId: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(
      subscriptionId,
      updateSubscriptionDto,
    );
  }

  @UseGuards(ChannelSubscriptionAuthorizationGuard)
  @Delete(':subscriptionId')
  @HttpCode(HttpStatus.ACCEPTED)
  async remove(@Param('subscriptionId') subscriptionId: string) {
    await this.subscriptionsService.remove(subscriptionId);
  }
}
