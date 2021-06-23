import { Injectable } from '@nestjs/common';
import { CreateComplimentDto } from '../dto/create-compliment.dto';
import { UpdateComplimentDto } from '../dto/update-compliment.dto';

@Injectable()
export class ComplimentService {
  create(createComplimentDto: CreateComplimentDto) {
    return 'This action adds a new compliment';
  }

  findAll() {
    return `This action returns all compliment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compliment`;
  }

  update(id: number, updateComplimentDto: UpdateComplimentDto) {
    return `This action updates a #${id} compliment`;
  }

  remove(id: number) {
    return `This action removes a #${id} compliment`;
  }
}
