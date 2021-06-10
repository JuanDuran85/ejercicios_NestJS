import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajesController } from './mensajes/mensajes.controller';
import { MensajeService } from './mensajes/services/mensaje.service';
import { Mensaje } from './mensajes/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: '1234',
      database: 'sendmeapp_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje]),
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajeService],
})
export class AppModule {}
