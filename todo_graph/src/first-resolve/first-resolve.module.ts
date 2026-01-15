import { Module } from '@nestjs/common';
import { FirstResolveResolver } from './first-resolve.resolver';

@Module({
  providers: [FirstResolveResolver]
})
export class FirstResolveModule {}
