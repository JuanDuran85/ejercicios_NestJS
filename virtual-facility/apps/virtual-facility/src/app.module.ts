import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST_VF || 'localhost',
      port: Number(process.env.DB_PORT_VF) || 5432,
      username: process.env.DB_USERNAME_VF || 'postgres',
      password: process.env.DB_PASSWORD_VF || 'postgres',
      database: process.env.DB_NAME_VF || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logger: 'advanced-console',
      logging: true,
    }),
    BuildingsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
