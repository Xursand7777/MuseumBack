import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DbModule from './config/db';
import { JwtConfigModule } from './config/jwt';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./modules/user/user.module";
import { ExhibitModule } from './modules/exhibit/exhibit.module';
import { AuthModule } from './modules/auth/auth.module';
import { AudioModule } from './modules/files/audio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'), // Указываем путь к собранным клиентским файлам
      exclude: ['/api*'], // Исключаем маршруты API из перенаправления на статические файлы
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
      isGlobal: true
    }),
    JwtConfigModule, // Импортируем как JwtConfigModule
    DbModule,
    AudioModule,
    AuthModule,
    UserModule,
    ExhibitModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
