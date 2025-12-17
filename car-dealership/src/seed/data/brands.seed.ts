import { v4 as uuid } from 'uuid';
import { Brand } from '../../brands/entities/brand.entity';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Honda',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'BMW',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Mercedes-Benz',
    createdAt: Date.now(),
  },
];
