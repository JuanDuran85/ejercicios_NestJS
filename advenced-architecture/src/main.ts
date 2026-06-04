import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app: INestApplication<any> = await NestFactory.create(
    AppModule.register({ drive: 'in-memory' }),
  );
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
