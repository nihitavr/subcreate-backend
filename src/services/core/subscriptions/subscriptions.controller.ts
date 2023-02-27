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
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';

@UseGuards(UserChannelAuthorizationGuard)
@UseGuards(JwtAuthGuard)
@Controller('channels/:channelId/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

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

  @Get(':subscriptionId')
  findOne(@Param('subscriptionId') subscriptionId: string) {
    return this.subscriptionsService.findOne(subscriptionId);
  }

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

  @Delete(':subscriptionId')
  @HttpCode(HttpStatus.ACCEPTED)
  async remove(@Param('subscriptionId') subscriptionId: string) {
    await this.subscriptionsService.remove(subscriptionId);
  }
}
