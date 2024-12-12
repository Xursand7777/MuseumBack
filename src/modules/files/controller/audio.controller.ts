import {
  BadRequestException, Body,
  Controller, Delete, Get, NotFoundException, Param,
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
import { readdirSync, existsSync, unlinkSync } from 'fs';


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
          const { id, languageType, audioFileName } = req.body;

          if (!file) {
            throw new BadRequestException('Файл не был загружен!');
          }

          if (!id || !languageType) {
            throw new BadRequestException('ID и язык должны быть указаны!');
          }

          // Генерация имени файла
          const sanitizedFileName = audioFileName.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');
          const newFileName = `${id}-${sanitizedFileName}-${languageType}.mp3`;
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

  @Get(':id/:languageType')
  @ApiParam({ name: 'id', description: 'ID аудиофайла' })
  @ApiParam({ name: 'languageType', description: 'Тип языка (например: en, ru, uz)' })
  async getAudioFile(
    @Param('id') id: string,
    @Param('languageType') languageType: string,
    @Res() res: Response,
  ) {
    const directoryPath = join(process.cwd(), 'uploads', 'audioFiles');

    // Проверяем, существует ли директория
    if (!existsSync(directoryPath)) {
      throw new NotFoundException('Директория с файлами не найдена!');
    }

    // Читаем все файлы в директории
    const files = readdirSync(directoryPath);

    // Ищем файл, соответствующий id и languageType
    const matchingFile = files.find((file) =>
      file.startsWith(`${id}-`) && file.endsWith(`-${languageType}.mp3`),
    );

    if (!matchingFile) {
      throw new NotFoundException('Файл не найден!');
    }

    // Полный путь к найденному файлу
    const filePath = join(directoryPath, matchingFile);

    // Отправляем файл клиенту
    return res.sendFile(filePath);
  }

  // Удаление файла по audioFilePath
  @Delete(':id/:languageType')
  @ApiParam({ name: 'id', description: 'ID аудиофайла' })
  @ApiParam({ name: 'languageType', description: 'Тип языка (например: en, ru, uz)' })
  async deleteAudioFile(
    @Param('id') id: string,
    @Param('languageType') languageType: string,
  ) {
    const directoryPath = join(process.cwd(), 'uploads', 'audioFiles');

    // Проверяем, существует ли директория
    if (!existsSync(directoryPath)) {
      throw new NotFoundException('Директория с файлами не найдена!');
    }

    // Читаем все файлы в директории
    const files = readdirSync(directoryPath);

    // Ищем файл, соответствующий id и languageType
    const matchingFile = files.find((file) =>
      file.startsWith(`${id}-`) && file.endsWith(`-${languageType}.mp3`),
    );

    if (!matchingFile) {
      throw new NotFoundException('Файл не найден!');
    }

    // Полный путь к найденному файлу
    const filePath = join(directoryPath, matchingFile);

    try {
      // Удаляем файл
      unlinkSync(filePath);
      return { message: 'Файл успешно удален!', file: matchingFile };
    } catch (err) {
      console.error('Ошибка при удалении файла:', err);
      throw new BadRequestException('Не удалось удалить файл!');
    }
  }



}