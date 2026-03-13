import { Controller, Get, Param } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  public async getOrderReport(
    @Param('orderId') orderId: string,
  ): Promise<string> {
    return this.storeReportsService.getOrderReport(orderId);
  }
}
