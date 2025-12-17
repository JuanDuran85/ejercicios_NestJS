import { v4 as uuid } from 'uuid';
import { Car } from '../../cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
  },
  {
    id: uuid(),
    brand: 'BMW',
    model: 'X5',
    year: 2024,
  },
  {
    id: uuid(),
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2025,
  },
];
