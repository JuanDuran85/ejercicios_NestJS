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
import { AuthUser, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @AuthUser()
  public create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product | undefined> {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<Product[] | undefined> {
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
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @AuthUser(ValidRoles.admin)
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.remove(id);
  }
}
