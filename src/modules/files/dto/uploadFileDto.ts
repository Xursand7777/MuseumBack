import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAudioFileDto {
  @ApiProperty({ description: 'ID файла' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Тип языка (например: en, ru, uz)' })
  @IsNotEmpty()
  @IsString()
  languageType: string;

  @ApiProperty({ description: 'Имя аудиофайла' })
  @IsNotEmpty()
  @IsString()
  audioFileName: string;


  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  audioFile: any; // Свойство для файла
}