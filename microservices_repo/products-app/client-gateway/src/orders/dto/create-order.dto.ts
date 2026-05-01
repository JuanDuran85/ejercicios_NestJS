import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @Min(0)
  @IsPositive()
  totalItems: number;

  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `status must be one of ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  paid: boolean = false;

  constructor(
    totalAmount: number,
    totalItems: number,
    status?: OrderStatus,
    paid?: boolean,
  ) {
    this.totalAmount = totalAmount;
    this.totalItems = totalItems;
    if (status) {
      this.status = status;
    }
    if (paid) {
      this.paid = paid;
    }
  }
}
