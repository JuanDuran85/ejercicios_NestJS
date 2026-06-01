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
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  app.startAllMicroservices();

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
  logger.debug(`Workflows Service running on port ${port}`);
}
bootstrap();
