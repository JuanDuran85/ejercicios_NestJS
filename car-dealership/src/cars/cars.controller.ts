import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private readonly cars = ['Toyota', 'Honda', 'BMW'];
  @Get('/')
  public getAllCars() {
    return ['Toyota', 'Honda', 'BMW'];
  }

  @Get(':id')
  public getCarById(@Param('id') id: string) {
    return this.cars[+id];
  }
}
