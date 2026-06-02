import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { HealthModule } from './health/health.module';
import { InboxModule } from './inbox/inbox.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST_WF || 'localhost',
      port: +process.env.DB_PORT_WF! || 5432,
      username: process.env.DB_USERNAME_WF || 'postgres',
      password: process.env.DB_PASSWORD_WF || 'postgres',
      database: process.env.DB_NAME_WF || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    WorkflowsModule,
    HealthModule,
    InboxModule,
  ],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
