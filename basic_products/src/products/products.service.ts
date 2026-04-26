import { Injectable } from '@nestjs/common';
import { v4 as UuidV4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly products: Product[] = [];

  constructor(){}

  public create(createProductDto: CreateProductDto) {
    const {name, price, description} = createProductDto;
    const newProduct: Product = new Product(UuidV4(), name, description || '', price);
    this.products.push(newProduct);
    return newProduct;
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
