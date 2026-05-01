import { Controller, NotImplementedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  public create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  public findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')
  public findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  public changeOrderStatus(@Payload() updateOrderDto: UpdateOrderDto) {
    throw new NotImplementedException();
  }
}
