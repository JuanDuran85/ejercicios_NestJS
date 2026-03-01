import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

@Module({
  providers: [CoffeesResolver, CoffeesService],
  exports: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [],
})
export class CoffeesModule {}
