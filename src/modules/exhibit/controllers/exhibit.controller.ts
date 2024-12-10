import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExhibitService } from '../services/exhibit.service';
import { CreateExhibitDto } from '../dto/create-exhibit.dto';
import { UpdateExhibitDto } from '../dto/update-exhibit.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Exhibits')
@Controller('exhibits')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}

  // Create a new exhibit
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExhibitDto: CreateExhibitDto, @Request() req: any) {
    const userId = req.user.userId; // Извлечение userId из токена
    return this.exhibitService.create(createExhibitDto, userId);
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
