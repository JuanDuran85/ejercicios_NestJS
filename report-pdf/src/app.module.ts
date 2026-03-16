import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { PrismaService } from './prisma.service';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { ExtraReportModule } from './extra-report/extra-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BasicReportsModule,
    PrinterModule,
    StoreReportsModule,
    ExtraReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
