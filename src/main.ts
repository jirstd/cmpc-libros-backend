import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { runSeed } from './database/seeders/seed';
import { Sequelize } from 'sequelize-typescript';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('CMPC Libros API')
    .setDescription('Documentación de la API para la gestión de libros CMPC')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const sequelize = app.get(Sequelize);
  if (process.env.NODE_ENV !== 'production') {
    await runSeed(sequelize);
    console.log('📦 Base de datos poblada con datos dummy');
  }

  await app.listen(3000);
}
bootstrap();
