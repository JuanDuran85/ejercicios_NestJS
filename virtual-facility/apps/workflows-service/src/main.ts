import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(
    WorkflowsServiceModule,
  );
  await app.listen(3100);
}
bootstrap();
