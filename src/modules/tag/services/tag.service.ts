import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { PrismaService } from '@shared/prisma/prisma.service';
import { Tag } from '@modules/tag/infra/prisma/entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name }: CreateTagDto): Promise<Tag> {
    const findTagName = await this.prisma.tag.findFirst({
      where: { name: name },
    });

    if (findTagName) {
      throw new HttpException('Tag name already taken', HttpStatus.BAD_REQUEST);
    }

    const createdTag = await this.prisma.tag.create({ data: { name } });

    return createdTag;
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
