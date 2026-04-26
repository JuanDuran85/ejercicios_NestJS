import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  public findAll() {
    return `This action returns all products`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  public update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
