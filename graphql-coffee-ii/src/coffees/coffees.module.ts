import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { Coffee, Flavor } from './entities';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';

@Module({
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver, FlavorsByCoffeeLoader],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  controllers: [],
})
export class CoffeesModule {}
