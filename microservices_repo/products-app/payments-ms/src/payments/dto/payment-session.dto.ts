import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class PaymentSessionDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentSessionItemDto)
  items: PaymentSessionItemDto[];

  constructor(currency: string, items: PaymentSessionItemDto[]) {
    this.currency = currency;
    this.items = items;
  }
}

export class PaymentSessionItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
