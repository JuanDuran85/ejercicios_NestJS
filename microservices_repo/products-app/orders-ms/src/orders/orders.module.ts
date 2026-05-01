import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  imports: [],
  exports: [],
})
export class OrdersModule {}
