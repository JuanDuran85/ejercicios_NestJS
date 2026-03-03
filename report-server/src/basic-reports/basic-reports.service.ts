import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BasicReportsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBasicReports() {
    return 'Report test one';
  }
}
