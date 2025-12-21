import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  public create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | undefined> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  public findAll(@Query() paginationDto: PaginationDto): Promise<Product[]> {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':searchParam')
  public findOne(
    @Param('searchParam') searchParam: string,
  ): Promise<Product | null> {
    return this.productsService.findOne(searchParam);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.remove(id);
  }
}
