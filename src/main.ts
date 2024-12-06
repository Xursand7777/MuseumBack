import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

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
  app.enableCors(corsOptions); // Передаём corsOptions в enableCors



    const config = new DocumentBuilder()
        .setTitle('Museum')
        .setDescription('The museum API description')
        .setVersion('1.0f')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'jwt',
        )
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  // Настройка статической раздачи файлов

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
