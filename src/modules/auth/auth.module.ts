import {Module} from "@nestjs/common";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";
import {UserModule} from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
      UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
        imports: [ConfigModule], // Подключаем ConfigModule
        inject: [ConfigService], // Инжектируем ConfigService
        useFactory: async (configService: ConfigService) => ({
          secret: 'nestone', // Получаем секрет из переменных окружения
          signOptions: { expiresIn: '1d' }, // Опционально задаем срок действия токена
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}