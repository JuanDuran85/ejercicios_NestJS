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
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUuid } from 'uuid';
import { Product, ProductImage } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductResponse } from './interfaces/products-response.interface';

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
  ): Promise<Product | undefined> {
    try {
      const { images = [], ...productDetails } = createProductDto;
      const product: Product = this.productRepository.create({
        ...productDetails,
        images: images.map((url) =>
          this.productImageRepository.create({ url }),
        ),
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handlerDbExceptions(error);
    }
  }

  public async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });
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

  private handlerDbExceptions(error: any) {
    console.error(error);
    if (error.code === '23505') throw new BadRequestException(error?.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
