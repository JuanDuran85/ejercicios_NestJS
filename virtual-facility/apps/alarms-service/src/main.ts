import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AlarmsServiceModule } from './alarms-service.module';

async function bootstrap() {
  const logger: Logger = new Logger('Alarms Service');
  const app: INestApplication<any> =
    await NestFactory.create(AlarmsServiceModule);
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
        queue: 'alarms-service',
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  logger.debug(`Alarms Service running on port ${port}`);
}
bootstrap();
