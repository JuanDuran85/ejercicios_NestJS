import { Injectable, NotFoundException } from '@nestjs/common';
import type { TCreatedPdf } from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { PrismaService } from '../prisma.service';
import {
  getBasicChartSvgReport,
  getStatisticsReport,
  orderByIdReport,
} from '../reports';

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

    const docDefinition: TDocumentDefinitions = orderByIdReport({
      data: orderFound as any,
    });
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public async getSvgChart(): Promise<TCreatedPdf> {
    const docDefinition: TDocumentDefinitions = await getBasicChartSvgReport();
    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }

  public async getStatistics() {
    const topCountry = await this.prismaService.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    if (!topCountry) throw new NotFoundException('Top country not found');

    const topCountriesData = topCountry.map((country) => ({
      country: country.country!,
      customers: country._count,
    }));

    const docDefinition: TDocumentDefinitions = await getStatisticsReport({
      topCountries: topCountriesData,
    });

    return this.printerService.createPdf(docDefinition, {
      autoPrint: true,
      bufferPages: true,
      fontLayoutCache: true,
    });
  }
}
