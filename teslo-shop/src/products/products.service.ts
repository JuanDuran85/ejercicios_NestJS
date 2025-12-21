import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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
      console.debug(error);
      this.handlerDbExceptions(error);
    }
  }

  public async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async findOne(searchParam: string): Promise<Product | null> {
    const productFound: Product | null = await this.productRepository.findOneBy(
      {
        id: searchParam,
      },
    );
    if (!productFound)
      throw new NotFoundException(`Product with id ${searchParam} not found`);
    return productFound;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public async remove(searchParams: string): Promise<string> {
    const productFound = await this.findOne(searchParams);
    await this.productRepository.remove(productFound!);
    return `This action removed a #${searchParams} product`;
  }

  private handlerDbExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error?.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
