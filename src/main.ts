import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const uploadDir = join(__dirname, '..', 'uploads', 'audioFiles');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  // Настройка CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Фронтенд адрес
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешённые методы
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Поддержка отправки cookies
  };


  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Museum Back Api') // Название API
    .setDescription('API documentation for m') // Описание
    .setVersion('1.0') // Версия
    .addBearerAuth() // Подключение авторизации
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Сохранять авторизацию между запросами
    },
  });


  app.enableCors(corsOptions); // Передаём corsOptions в enableCors

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
