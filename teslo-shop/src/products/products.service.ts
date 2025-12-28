import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  DataSource,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { validate as isUuid } from 'uuid';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';
import { ProductResponse } from './interfaces/products-response.interface';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly datasource: DataSource,
  ) {}

  public async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product | undefined> {
    try {
      const { images = [], ...productDetails } = createProductDto;
      const product: Product = this.productRepository.create({
        ...productDetails,
        images: images.map((url) =>
          this.productImageRepository.create({ url }),
        ),
        user,
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handlerDbExceptions(error);
    }
  }

  public async findAll(
    paginationDto: PaginationDto,
  ): Promise<Product[] | undefined> {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const result: Product[] = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true,
        },
      });

      if (!result) throw new NotFoundException('Products not found');

      return result;
    } catch (error) {
      this.logger.error(`Error in findAll:`);
      this.handlerDbExceptions(error);
    }
  }

  public async findOne(searchParam: string): Promise<Product> {
    const productFound: Product | null = isUuid(searchParam)
      ? await this.productRepository.findOneBy({ id: searchParam })
      : await this.productRepository
          .createQueryBuilder('prod')
          .where('upper(title) =:title or slug =:slug', {
            title: searchParam.toUpperCase().trim(),
            slug: searchParam.toLowerCase().trim(),
          })
          .leftJoinAndSelect('prod.images', 'prodImages')
          .getOne();

    if (!productFound)
      throw new NotFoundException(
        `Product by param: ${searchParam}, was not found`,
      );

    return productFound;
  }

  public async findOnePlain(searchParam: string): Promise<ProductResponse> {
    const { images = [], ...product } = await this.findOne(searchParam);
    return {
      ...product,
      images: images.map((image) => image.url),
    };
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<ProductResponse> {
    const { images, ...restProductToUpdate } = updateProductDto;

    const productUpdated: Product | undefined =
      await this.productRepository.preload({
        id,
        ...restProductToUpdate,
      });
    if (!productUpdated)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const queryRunnerProduct = this.datasource.createQueryRunner();
    await queryRunnerProduct.connect();
    await queryRunnerProduct.startTransaction();

    try {
      if (images) {
        await queryRunnerProduct.manager.delete(ProductImage, {
          product: { id },
        });

        productUpdated.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }
      productUpdated.user = user;
      await queryRunnerProduct.manager.save(productUpdated);
      await queryRunnerProduct.commitTransaction();
      await queryRunnerProduct.release();
    } catch (error) {
      await queryRunnerProduct.rollbackTransaction();
      await queryRunnerProduct.release();
      this.handlerDbExceptions(error);
    }

    return this.findOnePlain(id);
  }

  public async remove(searchParams: string): Promise<string> {
    const productFound = await this.findOne(searchParams);
    await this.productRepository.remove(productFound);
    return `This action removed a #${searchParams} product`;
  }

  public async deleteAllProducts(): Promise<DeleteResult | undefined> {
    const query: SelectQueryBuilder<Product> =
      this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handlerDbExceptions(error);
    }
  }

  public async checkDatabaseConnection(): Promise<boolean> {
    try {
      this.logger.log(`Checking database connection...`);
      const isConnected = this.datasource.isInitialized;
      this.logger.log(
        `Database connection status: ${isConnected ? 'connected' : 'not connected'}`,
      );

      if (isConnected) {
        const result = await this.datasource.query('SELECT 1 as test');
        this.logger.log(
          `Database query test result: ${JSON.stringify(result)}`,
        );
      }

      return isConnected;
    } catch (error) {
      this.logger.error(`Database connection check failed:`, error);
      return false;
    }
  }

  private handlerDbExceptions(error: any) {
    this.logger.error(`Error stack:`, error.stack);
    if (error.code === '23505') throw new BadRequestException(error?.detail);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
