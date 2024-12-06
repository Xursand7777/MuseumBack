import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExhibitDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
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
  @IsNotEmpty()
  uzAudioName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ruAudioName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enAudioName: string;
}