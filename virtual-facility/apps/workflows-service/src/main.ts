import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkflowsServiceModule } from './workflows-service.module';

async function bootstrap() {
  const logger: Logger = new Logger('Workflows Service');
  const app: INestApplication<any> = await NestFactory.create(
    WorkflowsServiceModule,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
    },
  });
  app.startAllMicroservices();

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
  logger.debug(`Workflows Service running on port ${port}`);
}
bootstrap();
