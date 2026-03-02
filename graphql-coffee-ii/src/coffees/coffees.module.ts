import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { Coffee, Flavor } from './entities';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

@Module({
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [],
})
export class CoffeesModule {}
