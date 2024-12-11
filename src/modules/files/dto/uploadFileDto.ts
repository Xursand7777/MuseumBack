import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAudioFileDto {
  @ApiProperty({ description: 'ID файла', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Тип языка (например: en, ru, uz)', type: String })
  @IsNotEmpty()
  @IsString()
  languageType: string;

  @ApiProperty({ description: 'Имя аудиофайла', type: String })
  @IsNotEmpty()
  @IsString()
  audioFileName: string;


  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  audioFile: any; // Свойство для файла
}