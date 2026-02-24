import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const logger = new Logger('SeedRunner');
  // create a minimal application context (no HTTP server)
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const seedService = app.get(SeedService);
    const result = await seedService.executeSeed();
    logger.log(`Seed executed: ${result}`);
    await app.close();
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed', error as any);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
