import { Module } from '@nestjs/common';
import { BcryptJsAdapter, RedisAdapter } from './adapters';

@Module({
  imports: [],
  controllers: [],
  providers: [BcryptJsAdapter, RedisAdapter],
  exports: [BcryptJsAdapter, RedisAdapter],
})
export class CommonModule {}
