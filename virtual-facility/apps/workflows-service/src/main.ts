import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(
    WorkflowsServiceModule,
  );
  const port: number | string = process.env.PORT_A ?? 3001;
  await app.listen(port);
  console.debug(`Workflows service running on port ${port}`);
}
bootstrap();
