import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService, PrismaService],
})
export class BasicReportsModule {}
