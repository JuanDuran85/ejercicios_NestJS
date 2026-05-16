import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger: Logger = new Logger('Payments Microservice');

  const { port } = envs;

  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

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

  await app.listen(port ?? 3000);

  logger.debug(`Payments Microservice running on port ${port}`);
}
bootstrap();
