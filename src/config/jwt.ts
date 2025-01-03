import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const JwtConfigModule = JwtModule.registerAsync({
    imports: [ConfigModule], // Импорт ConfigModule
    inject: [ConfigService], // Инжектируем ConfigService
    useFactory: async (configService: ConfigService) => ({
        secret: 'nestone', // Читаем JWT_SECRET через ConfigService
        signOptions: { expiresIn: '1d' },
    }),
});