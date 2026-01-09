import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeServices: CoffeesService) {}

  @Public()
  @Get()
  public findAll(@Query() pagination: PaginationQueryDto) {
    return this.coffeeServices.findAll(pagination);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.coffeeServices.findOne(id);
  }

  @Post()
  public create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeServices.create(createCoffeeDto);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeServices.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.coffeeServices.remove(id);
  }
}
