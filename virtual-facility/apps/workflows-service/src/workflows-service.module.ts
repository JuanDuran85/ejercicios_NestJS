import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('WF_POSTGRES_DB_HOST'),
        port: parseInt(configService.get('WF_POSTGRES_DB_PORT') || '5432', 10),
        username: configService.get<string>('WF_POSTGRES_DB_USERNAME'),
        password: configService.get<string>('WF_POSTGRES_DB_PASSWORD'),
        database: configService.get<string>('WF_POSTGRES_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'debug',
        retryAttempts: 10,
        retryDelay: 5000,
        connectTimeout: 10000,
      }),
    }),
    WorkflowsModule,
  ],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
