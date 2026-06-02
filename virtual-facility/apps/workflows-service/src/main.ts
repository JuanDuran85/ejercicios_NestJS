import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkflowsServiceModule } from './workflows-service.module';

async function bootstrap() {
  const logger: Logger = new Logger('Workflows Service');

  const app: INestApplication<any> = await NestFactory.create(
    WorkflowsServiceModule,
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
        queue: 'workflows-service',
        noAck: false,
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.debug(`Workflows Service running on port ${port}`);
}
bootstrap();
