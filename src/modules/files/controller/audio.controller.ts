import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';

@Controller('audio')
export class AudioController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('audioFile', {

      storage: diskStorage({
        destination: './uploads/audioFiles', // Путь к папке для хранения файлов
        filename: (req, file, callback) => {
          // Генерация уникального имени файла
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = basename(file.originalname, extname(file.originalname)); // Имя файла без расширения

          // Добавляем .mp3 к имени файла
          const newFileName = `${originalName}-${uniqueSuffix}.mp3`;

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
  uploadAudioFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Файл успешно загружен!',
      filePath: `/uploads/audioFiles/${file.filename}`, // Возвращаем путь к файлу
    };
  }
}
