import ctx from './ctx';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './utils/filters/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Application entry point
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ctx.functions.env.checkEnvVariables();

  app.enableCors({
    origin: process.env.CORS_ORIGINS,
    methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS',
  });

  const config = new DocumentBuilder()
    .setTitle('Car Rental API')
    .setDescription(
      'API for car rental management, covering users, vehicles, brands, colors, countries, and related entities.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory());

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
