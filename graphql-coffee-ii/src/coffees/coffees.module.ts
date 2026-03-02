import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { Coffee, Flavor } from './entities';

@Module({
  providers: [CoffeesResolver, CoffeesService],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [],
})
export class CoffeesModule {}
