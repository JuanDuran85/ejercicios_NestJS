import { Module } from '@nestjs/common';
import { BcryptJsAdapter } from './adapters';

@Module({
  imports: [],
  controllers: [],
  providers: [BcryptJsAdapter],
  exports: [BcryptJsAdapter],
})
export class CommonModule {}
