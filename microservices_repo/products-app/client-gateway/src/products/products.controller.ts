import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { PRODUCT_SERVICE } from '../config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productClient: ClientProxy,
  ) {}

  @Post()
  public createProduct(@Body() body: unknown) {
    return 'creating product';
  }

  @Get()
  public findAllProduct(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  public findOneProductById(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'find_one_products' }, { id });
  }

  @Delete(':id')
  public deleteOneProductById(@Param('id') id: string) {
    return `deleting one product by id: #${id}`;
  }

  @Patch(':id')
  public updateOneProductById(@Param('id') id: string, @Body() body: unknown) {
    return `updating one product by id: #${id}`;
  }
}
