import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
@Injectable()
export class CarsService {
  private readonly cars: Car[] = [
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
      year: 2022,
    },
    {
      id: uuid(),
      brand: 'BMW',
      model: 'X5',
      year: 2022,
    },
    {
      id: uuid(),
      brand: 'Mercedes',
      model: 'C300',
      year: 2022,
    },
  ];

  public findAll() {
    return this.cars;
  }

  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  public create(createCarDto: CreateCarDto) {
    return createCarDto;
  }

  public update() {}

  public delete() {}
}
