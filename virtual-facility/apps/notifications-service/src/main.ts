import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsServiceModule } from './notifications-service.module';

async function bootstrap() {
  const logger: Logger = new Logger('Notifications Service');
  const app: INestApplication<any> = await NestFactory.create(
    NotificationsServiceModule,
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
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: 'notifications-service',
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  const port = process.env.PORT ?? 3004;
  await app.listen(port);
  logger.debug(`Notifications Service running on port ${port}`);
}
bootstrap();
