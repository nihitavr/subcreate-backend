import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './lib/database/database.module';
import { HealthModule } from './lib/health/health.module';
import { UsersModule } from './services/users/users.module';
import { HttpLoggerMiddleware } from './lib/middleware/app-logger.middleware';
import { CoreModule } from './services/core/core.module';
import { BlogModule } from './services/core/blog/blog.module';

@Module({
  imports: [DatabaseModule, HealthModule, CoreModule, UsersModule, BlogModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
