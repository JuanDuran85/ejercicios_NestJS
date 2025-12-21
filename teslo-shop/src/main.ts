import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
main();
