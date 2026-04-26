import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    const productCreated = await this.prismaService.product.create({
      data: createProductDto,
    });
    console.debug(productCreated);
    return productCreated;
  }

  public async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const totalProducts: number = await this.prismaService.product.count();
    const lastPage: number = Math.ceil(totalProducts / limit!);

    return {
      data: await this.prismaService.product.findMany({
        take: limit,
        skip: (page! - 1) * limit!,
      }),
      metadata: {
        totalProducts,
        lastPage,
        page,
      },
    };
  }

  public findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  public update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
