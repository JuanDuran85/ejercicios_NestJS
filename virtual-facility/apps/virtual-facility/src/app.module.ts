import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        host: configService.get<string>('VF_POSTGRES_DB_HOST'),
        port: parseInt(configService.get('VF_POSTGRES_DB_PORT') || '5433', 10),
        username: configService.get<string>('VF_POSTGRES_DB_USERNAME'),
        password: configService.get<string>('VF_POSTGRES_DB_PASSWORD'),
        database: configService.get<string>('VF_POSTGRES_DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        logger: 'debug',
        retryAttempts: 10,
        retryDelay: 5000,
        connectTimeout: 10000,
      }),
    }),
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}