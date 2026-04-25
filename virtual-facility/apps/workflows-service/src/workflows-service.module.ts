import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.WF_POSTGRES_DB_HOST,
      port: Number(process.env.WF_POSTGRES_DB_PORT),
      username: process.env.WF_POSTGRES_DB_USER,
      password: process.env.WF_POSTGRES_DB_PASSWORD,
      database: process.env.WF_POSTGRES_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WorkflowsModule,
  ],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
