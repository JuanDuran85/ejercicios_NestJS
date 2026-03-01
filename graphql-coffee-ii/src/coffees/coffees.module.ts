import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';

@Module({
  providers: [CoffeesResolver, CoffeesService],
  exports: [CoffeesService],
  imports: [],
  controllers: [],
})
export class CoffeesModule {}
