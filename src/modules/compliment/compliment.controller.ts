import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplimentService } from '@modules/compliment/compliment.service';
import { CreateComplimentDto } from '@modules/compliment/dto/create-compliment.dto';
import { UpdateComplimentDto } from '@modules/compliment/dto/update-compliment.dto';

@Controller('compliment')
export class ComplimentController {
  constructor(private readonly complimentService: ComplimentService) {}

  @Post()
  async create(@Body() createComplimentDto: CreateComplimentDto) {
    return await this.complimentService.create(createComplimentDto);
  }

  @Get()
  async findAll() {
    return await this.complimentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.complimentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComplimentDto: UpdateComplimentDto,
  ) {
    return await this.complimentService.update(id, updateComplimentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.complimentService.remove(id);
  }
}
