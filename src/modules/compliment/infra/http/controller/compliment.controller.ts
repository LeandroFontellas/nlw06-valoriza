import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplimentService } from '@modules/compliment/services/compliment.service';
import { CreateComplimentDto } from '@modules/compliment/dto/create-compliment.dto';
import { UpdateComplimentDto } from '@modules/compliment/dto/update-compliment.dto';

@Controller('compliment')
export class ComplimentController {
  constructor(private readonly complimentService: ComplimentService) {}

  @Post()
  create(@Body() createComplimentDto: CreateComplimentDto) {
    return this.complimentService.create(createComplimentDto);
  }

  @Get()
  findAll() {
    return this.complimentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complimentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComplimentDto: UpdateComplimentDto,
  ) {
    return this.complimentService.update(+id, updateComplimentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complimentService.remove(+id);
  }
}
