import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware';

@Module({
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
  exports: [],
  imports: [ConfigModule],
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
