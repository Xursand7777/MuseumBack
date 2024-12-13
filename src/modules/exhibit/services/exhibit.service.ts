import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from '../entities/exhibit.entity';
import { CreateExhibitDto } from '../dto/create-exhibit.dto';
import { UpdateExhibitDto } from '../dto/update-exhibit.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ExhibitService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitRepository: Repository<Exhibit>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new exhibit
  async create(createExhibitDto: CreateExhibitDto, userId: number): Promise<Exhibit> {
    const exhibit = new Exhibit();

    // Заполнение полей
    exhibit.name = createExhibitDto.name;
    exhibit.uzText = createExhibitDto.uzText;
    exhibit.ruText = createExhibitDto.ruText;
    exhibit.enText = createExhibitDto.enText;
    exhibit.uzAudioName = createExhibitDto.uzAudioName;
    exhibit.ruAudioName = createExhibitDto.ruAudioName;
    exhibit.enAudioName = createExhibitDto.enAudioName;

    // Связываем с пользователем
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    exhibit.createdBy = user;
    exhibit.createdById = user.id;

    // Сохранение записи
    return this.exhibitRepository.save(exhibit);
  }

  // Get all exhibits
  async findAll(): Promise<Exhibit[]> {
    return this.exhibitRepository.find({ where: { isActive: true } });
  }

  // Get a single exhibit by ID
  async findOne(id: number): Promise<Exhibit> {
    const exhibit = await this.exhibitRepository.findOne({ where: { id, isActive: true } });
    if (!exhibit) {
      throw new NotFoundException(`Exhibit with ID ${id} not found`);
    }
    return exhibit;
  }

  // Update an exhibit
  async update(id: number, updateExhibitDto: UpdateExhibitDto): Promise<Exhibit> {
    const exhibit = await this.findOne(id);
    Object.assign(exhibit, updateExhibitDto);
    return this.exhibitRepository.save(exhibit);
  }

  // Delete (soft delete) an exhibit
  async remove(id: number, deletedBy: string): Promise<void> {
    const exhibit = await this.findOne(id);
    exhibit.deletedBy = deletedBy;
    exhibit.isActive = false;
    await this.exhibitRepository.save(exhibit);
  }

  // Restore a soft-deleted exhibit
  async restore(id: number): Promise<void> {
    const exhibit = await this.exhibitRepository.findOne({ where: { id } });
    if (!exhibit) {
      throw new NotFoundException(`Exhibit with ID ${id} not found`);
    }
    exhibit.isActive = true;
    await this.exhibitRepository.save(exhibit);
  }
}
