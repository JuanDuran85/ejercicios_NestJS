import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
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

  public findAll(): Car[] {
    return this.cars;
  }

  public findOneById(id: string): Car {
    const car: Car | undefined = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  public create(createCarDto: CreateCarDto): Car {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  public update(id: string, updateCarDto: UpdateCarDto): Car {
    const newUpdateCarDto = Object.fromEntries(
      Object.entries(updateCarDto).filter(([_, value]) => value !== undefined),
    );

    let carFound: Car = this.findOneById(id);

    if (newUpdateCarDto?.id && newUpdateCarDto?.id !== id)
      throw new BadRequestException('Car id is not valid');

    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        carFound = { ...carFound, ...newUpdateCarDto, id };
        return carFound;
      }
      return car;
    });
    return carFound;
  }

  public delete(id: string): void {
    this.findOneById(id);
    this.cars = this.cars.filter((car: Car) => car.id !== id);
  }

  public fillCarsWithSeedData(cars: Car[]): void {
    this.cars = cars;
  }
}
