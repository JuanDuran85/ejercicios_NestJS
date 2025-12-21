import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async create(
    createProductDto: CreateProductDto,
  ): Promise<Product | undefined> {
    try {
      const product: Product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      console.debug(product);
      return product;
    } catch (error) {
      this.handlerDbExceptions(error);
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

  private handlerDbExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error?.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
