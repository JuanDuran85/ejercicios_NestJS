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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from '../common';
import { PRODUCT_SERVICE } from '../config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productClient: ClientProxy,
  ) {}

  @Post()
  public createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClient
      .send({ cmd: 'create_product' }, createProductDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error as unknown as object);
        }),
      );
  }

  @Get()
  public findAllProduct(@Query() paginationDto: PaginationDto) {
    return this.productClient
      .send({ cmd: 'find_all_products' }, paginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error as unknown as object);
        }),
      );
  }

  @Get(':id')
  public async findOneProductById(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'find_one_products' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error as unknown as object);
    }
  }

  @Delete(':id')
  public deleteOneProductById(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'delete_products' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as unknown as object);
      }),
    );
  }

  @Patch(':id')
  public updateOneProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productClient
      .send({ cmd: 'update_products' }, { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as unknown as object);
        }),
      );
  }
}
