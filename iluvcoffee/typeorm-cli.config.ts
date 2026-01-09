import { DataSource } from 'typeorm';
import { Coffee } from './src/coffees/entities/coffee.entity';
import { Flavor } from './src/coffees/entities/flavor.entity';
import { CoffeeRefactor1767810927392 } from './src/migrations/1767810927392-CoffeeRefactor';
import { SchemaSync1767811873374 } from './src/migrations/1767811873374-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres1234',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1767810927392, SchemaSync1767811873374],
});
