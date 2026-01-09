import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import {
  COFFEE_BRANDS,
  COFFEE_BRANDS_2,
  COFFEE_BRANDS_3,
} from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import coffeesConfig from './config/coffees.config';

class ConfigServiceTest {}
class DevelopmentConfigServiceTest {}
class ProductionConfigServiceTest {}

// ! ----------------------------------------------
//? Random provider for illustration proposes

@Injectable()
export class CoffeeBrandsThreeFactory {
  public create() {
    console.debug('buddy brew 3, nescafe 3');
    return ['buddy brew 3', 'nescafe 3'];
  }
}
// ! ----------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsThreeFactory,
    {
      provide: ConfigServiceTest,
      useClass:
        process.env.NODE_ENV === 'stg'
          ? DevelopmentConfigServiceTest
          : ProductionConfigServiceTest,
    },
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    {
      provide: COFFEE_BRANDS_2,
      useFactory: () => ['buddy brew 2', 'nescafe 2'],
    },
    {
      provide: COFFEE_BRANDS_3,
      useFactory: (brandsFactory: CoffeeBrandsThreeFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsThreeFactory],
    },
    {
      provide: 'COFFEE_BRANDS_4',
      useFactory: async (connection: DataSourceOptions): Promise<string[]> => {
        const coffeeBrands4: string[] = await Promise.resolve([
          'buddy brew 4',
          'nescafe 4',
        ]);
        console.debug({ coffeeBrands4 });
        return coffeeBrands4;
      },
      inject: [DataSource],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
