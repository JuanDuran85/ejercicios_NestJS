import { Injectable, NotFoundException } from '@nestjs/common';
import type { TCreatedPdf } from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import { orderByIdReport } from '../reports';
import { NotFoundError } from 'rxjs';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  public async getOrderReport(orderId: number): Promise<TCreatedPdf> {
    const orderFound = await this.prismaService.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!orderFound)
      throw new NotFoundException(`Order with id ${orderId} not found`);
    console.debug(JSON.stringify(orderFound, null, 2));

    const docDefinition: TDocumentDefinitions = orderByIdReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
