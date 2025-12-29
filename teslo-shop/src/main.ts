import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const logger: Logger = new Logger('Main');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Teslo REST API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory: () => OpenAPIObject = () =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${process.env.PORT ?? 3000}`);
}

main();
