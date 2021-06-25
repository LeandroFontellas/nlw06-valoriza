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
import { TagService } from '@modules/tag/services/tag.service';
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
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
