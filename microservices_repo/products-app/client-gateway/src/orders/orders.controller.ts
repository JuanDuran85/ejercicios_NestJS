import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { ORDER_SERVICE } from '../config';
import { CreateOrderDto } from './dto';
import { OrderClient } from './interfaces';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  public create(
    @Body() createOrderDto: CreateOrderDto,
  ): Observable<OrderClient> {
    return this.orderClient.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error as unknown as object);
      }),
    );
  }

  @Get()
  public findAll(): Observable<OrderClient> {
    return this.orderClient.send('findAllOrders', {}).pipe(
      catchError((error) => {
        throw new RpcException(error as unknown as object);
      }),
    );
  }

  @Get(':id')
  public findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Observable<OrderClient> {
    return this.orderClient.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as unknown as object);
      }),
    );
  }
}
