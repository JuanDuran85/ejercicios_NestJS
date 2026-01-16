import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';

import { PubSubModule } from '../pub-sub';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { Coffee, Flavor } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  controllers: [],
  exports: [],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
})
export class CoffeesModule { }
