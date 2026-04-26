import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UuidV4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor() {}

  public create(createProductDto: CreateProductDto): Product {
    const { name, price, description } = createProductDto;
    const newProduct: Product = new Product(
      UuidV4(),
      name,
      description || '',
      price,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  public findAll(): Product[] {
    return this.products;
  }

  public findOne(id: string): Product | undefined {
    const productFound: Product | undefined = this.products.find(
      (product: Product) => product.id === id,
    );
    if (!productFound)
      throw new NotFoundException(`Product with id ${id} not found`);
    return productFound;
  }

  public update(id: string, updateProductDto: UpdateProductDto) {
    const productFound: Product = this.findOne(id)!;
    const { description, name, price } = updateProductDto;
    productFound.updateWith({ name, description, price });
    return productFound;
  }

  public remove(id: string): Product {
    const productFound: Product = this.findOne(id)!;
    this.products = this.products.filter(
      (product: Product) => product.id !== id,
    );
    return productFound;
  }
}
