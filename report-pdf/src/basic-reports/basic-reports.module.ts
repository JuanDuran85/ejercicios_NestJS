import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasicReportsController } from './basic-reports.controller';
import { BasicReportsService } from './basic-reports.service';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService, PrismaService],
})
export class BasicReportsModule {}
