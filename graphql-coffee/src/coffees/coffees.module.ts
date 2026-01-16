import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';

import { Coffee, Flavor } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [],
  exports: [],
  providers: [CoffeesResolver, CoffeesService],
})
export class CoffeesModule {}
