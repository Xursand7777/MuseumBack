import { Module } from '@nestjs/common';
import { AudioController } from './controller/audio.controller';

@Module({
  imports: [],
  controllers: [AudioController],
  providers: []
})
export class AudioModule {}