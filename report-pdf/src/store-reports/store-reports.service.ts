import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreReportsService {
  constructor() {}

  public async getOrderReport(orderId: string): Promise<string> {
    return `Order Id to report: ${orderId}`;
  }
}
