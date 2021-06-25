import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TagService } from '@modules/tag/tag.service';
import { CreateTagDto } from '@modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tag/dto/update-tag.dto';
import { AdminGuard } from '@modules/tag/guards/admin.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @HttpCode(201)
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagService.update(id, updateTagDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(id);
  }
}
