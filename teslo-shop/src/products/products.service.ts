import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUuid } from 'uuid';
import { Product, ProductImage } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
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

  public async findOne(searchParam: string): Promise<Product | null> {
    const productFound: Product | null = isUuid(searchParam)
      ? await this.productRepository.findOneBy({ id: searchParam })
      : await this.productRepository
          .createQueryBuilder()
          .where('upper(title) =:title or slug =:slug', {
            title: searchParam.toUpperCase().trim(),
            slug: searchParam.toLowerCase().trim(),
          })
          .getOne();

    if (!productFound)
      throw new NotFoundException(
        `Product by param: ${searchParam}, was not found`,
      );

    return productFound;
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productUpdated: Product | undefined =
      await this.productRepository.preload({
        id,
        ...updateProductDto,
        images: [],
      });

    if (!productUpdated)
      throw new NotFoundException(`Product with id: ${id} not found`);
    try {
      await this.productRepository.save(productUpdated);
    } catch (error) {
      this.handlerDbExceptions(error);
    }

    return productUpdated;
  }

  public async remove(searchParams: string): Promise<string> {
    const productFound = await this.findOne(searchParams);
    await this.productRepository.remove(productFound!);
    return `This action removed a #${searchParams} product`;
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
