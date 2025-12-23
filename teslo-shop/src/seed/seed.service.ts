import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  public async runSeed(): Promise<boolean> {
    try {
      await this.productService.deleteAllProducts();
    } catch (error) {
      console.error(String(error));
      return false;
    }
    return true;
  }
}
