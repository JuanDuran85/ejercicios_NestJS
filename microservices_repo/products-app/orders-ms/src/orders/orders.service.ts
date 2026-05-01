import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(createOrderDto: CreateOrderDto) {
    return "orders";
  }

  public findAll() {
    return this.prismaService.order.findMany({});
  }

  public findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
