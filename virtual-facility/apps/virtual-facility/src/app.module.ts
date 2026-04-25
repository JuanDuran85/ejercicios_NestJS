import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.VF_POSTGRES_DB_HOST,
      port: Number(process.env.VF_POSTGRES_DB_PORT),
      username: process.env.VF_POSTGRES_DB_USERNAME,
      password: process.env.VF_POSTGRES_DB_PASSWORD,
      database: process.env.VF_POSTGRES_DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
