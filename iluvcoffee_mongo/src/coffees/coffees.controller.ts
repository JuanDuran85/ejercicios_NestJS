import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeServices: CoffeesService) {}

  @Get()
  public findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeServices.findAll(paginationQuery);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.coffeeServices.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeServices.create(createCoffeeDto);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeeServices.update(id, body);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.coffeeServices.remove(id);
  }
}
