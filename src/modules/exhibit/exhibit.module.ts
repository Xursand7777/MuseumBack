import { Module } from '@nestjs/common';
import { ExhibitService } from './services/exhibit.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './entities/exhibit.entity';
import { ExhibitController } from './controllers/exhibit.controller';

@Module({
  controllers: [
    ExhibitController,
  ],
  imports: [
    TypeOrmModule.forFeature([Exhibit]),
    UserModule
  ],
  providers: [ExhibitService],
})
export class ExhibitModule {}