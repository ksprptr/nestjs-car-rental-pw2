import ctx from './ctx';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Application entry point
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ctx.functions.env.checkEnvVariables();

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS',
  });

  const config = new DocumentBuilder().setTitle('Car Rental API').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory());

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
