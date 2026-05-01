import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderClient } from './interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(createOrderDto: CreateOrderDto): Promise<OrderClient> {
    return this.prismaService.order.create({
      data: createOrderDto,
    });
  }

  public findAll(): Promise<OrderClient[]> {
    return this.prismaService.order.findMany({});
  }

  public async findOne(id: string): Promise<OrderClient | null> {
    const order: OrderClient | null = await this.prismaService.order.findFirst({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        message: 'Order not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return order;
  }
}
