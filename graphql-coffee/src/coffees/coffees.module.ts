import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';

import { Coffee, Flavor } from './entities';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [],
  exports: [],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
})
export class CoffeesModule {}
