import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const port: number | string = process.env.PORT_A ?? 3000;
  await app.listen(port);
  console.debug(`Virtual Facility running on port ${port}`);
}
bootstrap();
