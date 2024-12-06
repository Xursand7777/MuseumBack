import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from '../entities/exhibit.entity';
import { CreateExhibitDto } from '../dto/create-exhibit.dto';
import { UpdateExhibitDto } from '../dto/update-exhibit.dto';

@Injectable()
export class ExhibitService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitRepository: Repository<Exhibit>,
  ) {}

  // Create a new exhibit
  async create(createExhibitDto: CreateExhibitDto): Promise<Exhibit> {
    const exhibit = this.exhibitRepository.create(createExhibitDto);
    return this.exhibitRepository.save(exhibit);
  }

  // Get all exhibits
  async findAll(): Promise<Exhibit[]> {
    return this.exhibitRepository.find();
  }

  // Get a single exhibit by ID
  async findOne(id: number): Promise<Exhibit> {
    const exhibit = await this.exhibitRepository.findOne({ where: { id } });
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
    await this.exhibitRepository.softRemove(exhibit);
  }

  // Restore a soft-deleted exhibit
  async restore(id: number): Promise<void> {
    const result = await this.exhibitRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exhibit with ID ${id} not found or not deleted`);
    }
  }
}
