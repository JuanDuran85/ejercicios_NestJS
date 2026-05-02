import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma.service';
import {
  ChangeOrderStatusFto,
  CreateOrderDto,
  OrderPaginationDto,
} from './dto';
import { AllFilterOrderResponse, OrderClient } from './interfaces';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(createOrderDto: CreateOrderDto): unknown {
    return {
      service: 'Orders Microservice',
      createOrderDto,
    };
    /*  return this.prismaService.order.create({
      data: createOrderDto,
    }); */
  }

  public async findAll(
    orderPaginationDto: OrderPaginationDto,
  ): Promise<AllFilterOrderResponse> {
    const { limit = 10, page = 1, status } = orderPaginationDto;
    const currentPage: number = page;
    const perPage: number = limit;

    const totalPages: number = await this.prismaService.order.count({
      where: { status },
    });

    return {
      data: await this.prismaService.order.findMany({
        take: perPage,
        skip: (currentPage - 1) * perPage,
        where: { status },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
        perPage,
      },
    };
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

  public async changeOrderStatus(
    changeOrderStatusDto: ChangeOrderStatusFto,
  ): Promise<OrderClient | null> {
    const { id, status } = changeOrderStatusDto;

    const orderFound: OrderClient | null = await this.findOne(id);

    if (orderFound?.status === status) {
      return orderFound;
    }

    return this.prismaService.order.update({
      where: { id },
      data: { status },
    });
  }
}
