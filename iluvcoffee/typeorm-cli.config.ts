import { DataSource } from 'typeorm';
import { CoffeeRefactor1767810927392 } from './src/migrations/1767810927392-CoffeeRefactor';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres1234',
  database: 'postgres',
  entities: [],
  migrations: [CoffeeRefactor1767810927392],
});
