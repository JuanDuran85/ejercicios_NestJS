import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('/')
  public getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  public getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post('/')
  public create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  /* @Put('/:id')
  public update(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return this.carsService.update(body, id);
  }

  @Patch('/:id')
  public updatePartial(
    @Body() body: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.carsService.updatePartial(body, id);
  }

  @Delete('/:id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.delete(id);
  } */
}
