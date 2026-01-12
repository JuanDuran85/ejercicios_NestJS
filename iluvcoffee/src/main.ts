import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import {
  TimeoutInterceptor,
  WrapResponseInterceptor,
} from './common/interceptors';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('ILuvCoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .addTag('coffee')
    .build();

  const documentFactory: () => OpenAPIObject = () =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: '/api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
main();
