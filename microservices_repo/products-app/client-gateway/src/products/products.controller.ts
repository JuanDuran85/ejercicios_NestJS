import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  public createProduct(@Body() body: unknown) {
    return 'creating product';
  }

  @Get()
  public findAllProduct() {
    return 'finding all products';
  }

  @Get(':id')
  public findOneProductById(@Param('id') id: string) {
    return `finding one product by id: #${id}`;
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
