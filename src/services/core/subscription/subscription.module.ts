import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDashboardController } from './subscription-dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription } from 'rxjs';
import { SubscriptionSchema } from './entities/subscription.entity';
import { GuardsModule } from 'src/services/auth/guards/guards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    GuardsModule,
  ],
  controllers: [SubscriptionDashboardController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
