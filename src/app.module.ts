import { Module } from '@nestjs/common';
import { DatabaseModule } from './lib/database/database.module';
import { HealthModule } from './lib/health/health.module';
import { UsersModule } from './services/users/users.module';
import { JwtStrategy } from './services/auth/strategy/jwt.strategy';
import { CoreModule } from './services/core/core.module';

@Module({
  imports: [DatabaseModule, HealthModule, CoreModule, UsersModule],
  providers: [JwtStrategy],
})
export class AppModule {}
