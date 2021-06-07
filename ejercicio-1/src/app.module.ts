import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrosController } from './libros/libros.controller';

@Module({
  imports: [],
  controllers: [AppController, LibrosController],
  providers: [AppService],
})
export class AppModule {}
