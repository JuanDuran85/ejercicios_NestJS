import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
main();
