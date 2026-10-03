import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { CircuitBreakerInterceptor } from '../common/interceptors/circuit-breaker.interceptor';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@UseInterceptors(CircuitBreakerInterceptor)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post()
  public create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<string> {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  public findAll(): void {
    console.debug('Find all Executed...');
    throw new RequestTimeoutException('Error: Request Timeout Exception');

    //return this.coffeesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): string {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): string {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): string {
    return this.coffeesService.remove(+id);
  }
}
