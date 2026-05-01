import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const { port } = envs;
  const logger: Logger = new Logger('bootstrap');
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(port ?? 3000);
  logger.log(`Order Microservice running on port ${port}`);
}
bootstrap();
