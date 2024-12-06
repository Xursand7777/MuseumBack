import { ApiProperty } from '@nestjs/swagger';

export class GetExhibitDto {
  @ApiProperty({ example: 1, description: 'Идентификатор экспоната' })
  exhibitId: number;

  @ApiProperty({ example: 'The Great Artifact', description: 'Название экспоната' })
  name: string;

  @ApiProperty({ example: 'artifact_photo.jpg', description: 'Имя файла фотографии экспоната' })
  photoName: string;
}