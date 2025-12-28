import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Product } from '../products/entities';
import { ProductsService } from '../products/products.service';
import { initialData, SeedProduct } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async runSeed(): Promise<string> {
    await this.deleteTables();
    const firstUser: User = await this.insertUsers();
    await this.insertNewProducts(firstUser);
    return 'SEED Executed';
  }

  private async insertUsers(): Promise<User> {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const usersResult = await this.userRepository.save(users);
    return usersResult[0];
  }

  private async insertNewProducts(user: User): Promise<void> {
    await this.productService.deleteAllProducts();

    const products: SeedProduct[] = initialData.products;
    const insertPromises: Promise<Product>[] = [];

    products.forEach((product: SeedProduct) => {
      const createdProduct = this.productService.create(
        product,
        user,
      ) as Promise<Product>;
      insertPromises.push(createdProduct);
    });
    await Promise.all(insertPromises);
  }

  private async deleteTables(): Promise<void> {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }
}
