import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateExhibitDto {
  @ApiProperty({ example: 'Updated Artifact Name', description: 'Название экспоната', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'updated_photo.jpg', description: 'Имя файла фотографии экспоната', required: false })
  @IsOptional()
  @IsString()
  photoName?: string;

  @ApiProperty({ example: 'Updated text in Uzbek', description: 'Текст на узбекском языке', required: false })
  @IsOptional()
  @IsString()
  uzText?: string;

  @ApiProperty({ example: 'Updated text in Russian', description: 'Текст на русском языке', required: false })
  @IsOptional()
  @IsString()
  ruText?: string;

  @ApiProperty({ example: 'Updated text in English', description: 'Текст на английском языке', required: false })
  @IsOptional()
  @IsString()
  enText?: string;

  @ApiProperty({ example: 'updated_uz_audio.mp3', description: 'Имя аудиофайла на узбекском языке', required: false })
  @IsOptional()
  @IsString()
  uzAudioName?: string;

  @ApiProperty({ example: 'updated_ru_audio.mp3', description: 'Имя аудиофайла на русском языке', required: false })
  @IsOptional()
  @IsString()
  ruAudioName?: string;

  @ApiProperty({ example: 'updated_en_audio.mp3', description: 'Имя аудиофайла на английском языке', required: false })
  @IsOptional()
  @IsString()
  enAudioName?: string;

  @ApiProperty({ example: 'AdminUser', description: 'Кто обновил запись', required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({ example: 5, description: 'Количество \"выстрелов\"', required: false })
  @IsOptional()
  @IsNumber()
  shotTimes?: number;
}