import { Injectable, NotFoundException } from '@nestjs/common';
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

    const totalProducts: number = await this.prismaService.product.count({
      where: { available: true },
    });
    const lastPage: number = Math.ceil(totalProducts / limit!);

    return {
      data: await this.prismaService.product.findMany({
        take: limit,
        skip: (page! - 1) * limit!,
        where: { available: true },
      }),
      metadata: {
        totalProducts,
        lastPage,
        page,
      },
    };
  }

  public async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: { id, available: true },
    });

    if (!productFound)
      throw new NotFoundException(`Product with id #${id} not found`);

    return productFound;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...restProduct } = updateProductDto;
    await this.findOne(id);
    return this.prismaService.product.update({
      where: { id },
      data: restProduct,
    });
  }

  public async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.product.update({
      where: { id },
      data: { available: false },
    });
  }
}
