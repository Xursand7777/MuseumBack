import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExhibitDto {
   @ApiProperty()
   @IsString()
   name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uzText: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ruText: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enText: string;

  @ApiProperty()
  @IsString()
  uzAudioName: string;

  @ApiProperty()
  @IsString()
  ruAudioName: string;

  @ApiProperty()
  @IsString()
  enAudioName: string;
}