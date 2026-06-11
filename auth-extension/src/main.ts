import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GlobalExceptionFilter,
  TypeOrmExceptionFilter,
} from './common/filters';
import { envs } from './config';

async function bootstrap() {
  const logger: Logger = new Logger('Main App');
  const { port } = envs;
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors();

  await app.listen(port ?? 3000);
  logger.log(`Server running on port ${port ?? 3000}`);
}
bootstrap();
