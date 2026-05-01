import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderClient } from './interfaces';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  public create(
    @Payload() createOrderDto: CreateOrderDto,
  ): Promise<OrderClient> {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  public findAll(): Promise<OrderClient[]> {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')
  public findOne(@Payload('id', ParseUUIDPipe) id: string): Promise<OrderClient | null> {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  public changeOrderStatus(@Payload() updateOrderDto: UpdateOrderDto) {
    throw new NotImplementedException();
  }
}
