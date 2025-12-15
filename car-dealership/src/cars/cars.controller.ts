import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get('/')
  public getAllCars() {
    return ['Toyota', 'Honda', 'BMW'];
  }
}
