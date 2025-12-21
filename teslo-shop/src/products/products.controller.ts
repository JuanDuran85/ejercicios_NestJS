import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

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
  public findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
