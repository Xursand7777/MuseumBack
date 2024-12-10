import {
  Controller, Get, NotFoundException, Param,
  Post, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { ApiConsumes, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadAudioFileDto } from '../dto/uploadFileDto';
import { existsSync } from 'fs';


@ApiTags('audio') // Группа маршрутов в Swagger
@Controller('audio')
export class AudioController {
  @ApiConsumes('multipart/form-data') // Указываем формат данных
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './uploads/audioFiles', // Путь к папке для хранения файлов
        filename: (req, file, callback) => {
          // Генерация уникального имени файла на основе id и languageType
          const id = req.body.id; // Предполагаем, что ID передаётся в теле запроса
          const languageType = req.body.languageType; // Тип языка из тела запроса
          const audioFileName = req.body.audioFileName;

          if (!id || !languageType) {
            return callback(new Error('ID и язык должны быть указаны!'), null);
          }

          // Устанавливаем имя файла как {id}-{languageType}.mp3
          const newFileName = `${id}-${audioFileName}-${languageType}.mp3`;

          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Проверка типа файла: только аудио
        if (!file.mimetype.startsWith('audio/')) {
          return callback(new Error('Файлы должны быть только аудио!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // Ограничение размера файла (10MB)
      },
    }),
  )
  @ApiConsumes('multipart/form-data') // Swagger понимает, что это загрузка файла
  @ApiBody({ type: UploadAudioFileDto })
  uploadAudioFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Файл не был загружен!');
    }

    return {
      message: 'Файл успешно загружен!',
      filePath: `/uploads/audioFiles/${file.filename}`, // Возвращаем путь к файлу
    };
  }

  @Get(':id/:audioFileName/:languageType')
  @ApiParam({ name: 'id', description: 'ID аудиофайла' })
  @ApiParam({ name: 'audioFileName', description: 'Имя аудиофайла (без расширения)' })
  @ApiParam({ name: 'languageType', description: 'Тип языка (например: en, ru, uz)' })
  async getAudioFile(
    @Param('id') id: string,
    @Param('audioFileName') audioFileName: string,
    @Param('languageType') languageType: string,
    @Res() res: Response,
  ) {
    const filePath = join(
      process.cwd(), // Абсолютный путь от корня проекта
      'uploads',
      'audioFiles',
      `${id}-${audioFileName}-${languageType}.mp3`,
    );

    // Проверяем, существует ли файл
    if (!existsSync(filePath)) {
      throw new NotFoundException('Файл не найден!');
    }

    // Отправляем файл клиенту
    return res.sendFile(filePath);
  }


}