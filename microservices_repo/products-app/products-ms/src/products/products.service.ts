import { Injectable } from '@nestjs/common';
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

  public findAll() {
    return this.prismaService.product.findMany();
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
