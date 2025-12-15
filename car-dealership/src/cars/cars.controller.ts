import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

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

  /*  @Post('/')
  public create(@Body() body: any) {
    return this.carsService.create(body);
  }

  @Put('/:id')
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
