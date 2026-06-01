import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('Virtual Facility Service');
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  logger.debug(`Virtual Facility Service running on port ${port}`);
}
bootstrap();
