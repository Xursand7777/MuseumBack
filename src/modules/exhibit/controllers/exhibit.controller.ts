import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExhibitService } from '../services/exhibit.service';
import { CreateExhibitDto } from '../dto/create-exhibit.dto';
import { UpdateExhibitDto } from '../dto/update-exhibit.dto';

@ApiTags('Exhibits')
@Controller('exhibits')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}

  // Create a new exhibit
  @Post()
  async create(@Body() createExhibitDto: CreateExhibitDto) {
    return this.exhibitService.create(createExhibitDto);
  }

  // Get all exhibits
  @Get()
  async findAll() {
    return this.exhibitService.findAll();
  }

  // Get a single exhibit by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.exhibitService.findOne(id);
  }

  // Update an exhibit
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExhibitDto: UpdateExhibitDto,
  ) {
    return this.exhibitService.update(id, updateExhibitDto);
  }

  // Delete (soft delete) an exhibit
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Body('deletedBy') deletedBy: string,
  ) {
    return this.exhibitService.remove(id, deletedBy);
  }

  // Restore a soft-deleted exhibit
  @Patch(':id/restore')
  async restore(@Param('id') id: number) {
    return this.exhibitService.restore(id);
  }
}
