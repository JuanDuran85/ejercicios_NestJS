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
import { ProductResponse } from './interfaces/products-response.interface';
import { AuthUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @AuthUser(ValidRoles.admin)
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
  ): Promise<ProductResponse> {
    return this.productsService.findOnePlain(searchParam);
  }

  @Patch(':id')
  @AuthUser(ValidRoles.admin)
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @AuthUser(ValidRoles.admin)
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.remove(id);
  }
}
