import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  public create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  public findAll() {
    return `This action returns all orders`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
