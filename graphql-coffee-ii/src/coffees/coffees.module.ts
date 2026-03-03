import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { Coffee, Flavor } from './entities';

@Module({
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  controllers: [],
})
export class CoffeesModule {}
