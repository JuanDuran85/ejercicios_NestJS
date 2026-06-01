import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AlarmsClassifierServiceModule } from './alarms-classifier-service.module';

async function bootstrap() {
  const logger: Logger = new Logger('Alarms Classifier Service');
  const app: INestApplication<any> = await NestFactory.create(
    AlarmsClassifierServiceModule,
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
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'alarms-classifier-service',
      },
    },
    { inheritAppConfig: true },
  );

  app.startAllMicroservices();
  const port = process.env.PORT ?? 3005;
  await app.listen(port);
  logger.debug(`Alarms Classifier Service running on port ${port}`);
}
bootstrap();
