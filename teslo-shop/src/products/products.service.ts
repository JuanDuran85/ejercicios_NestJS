import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async create(createProductDto: CreateProductDto): Promise<Product>
{
    try {
      const product: Product = this.productRepository.create(createProductDto);
      console.debug(product);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.error(String(error));
      throw new InternalServerErrorException(`Can't create product`);
    }
  }

  public async findAll() {
    return `This action returns all products`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
