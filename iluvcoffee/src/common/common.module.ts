import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
  exports: [],
  imports: [ConfigModule],
})
export class CommonModule {}
