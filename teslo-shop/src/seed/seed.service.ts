import { Injectable } from '@nestjs/common';
import { Product } from '../products/entities';
import { ProductsService } from '../products/products.service';
import { initialData, SeedProduct } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  public async runSeed(): Promise<string> {
    await this.insertNewProducts();

    return 'SEED Executed';
  }

  private async insertNewProducts(): Promise<void> {
    await this.productService.deleteAllProducts();

    const products: SeedProduct[] = initialData.products;
    const insertPromises: Promise<Product>[] = [];

    products.forEach((product: SeedProduct) => {
      const createdProduct = this.productService.create(
        product,
      ) as Promise<Product>;
      insertPromises.push(createdProduct);
    });
    await Promise.all(insertPromises);
  }
}
