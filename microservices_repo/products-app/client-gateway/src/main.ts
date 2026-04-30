import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const { port } = envs;
  const logger: Logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(port ?? 3000);
  logger.log(`Gateway running on port ${port}`);
}
bootstrap();
