import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@ApiTags('coffees')
@ApiBasicAuth()
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeServices: CoffeesService) {}

  @Public()
  @Get()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll(
    @Protocol('exampleMessage') protocol: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    console.debug(protocol);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeeServices.findAll(pagination);
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: string) {
    console.debug(id);
    return this.coffeeServices.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateCoffeeDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Coffee,
  })
  public create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeeServices.create(createCoffeeDto);
  }

  @ApiBody({ type: UpdateCoffeeDto })
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
