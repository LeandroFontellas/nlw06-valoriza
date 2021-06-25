import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@shared/prisma/prisma.service';
import { Tag } from '@modules/tag/entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name }: CreateTagDto): Promise<Tag> {
    if (!name) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    const findTagName = await this.prisma.tag.findFirst({
      where: { name: name },
    });

    if (findTagName) {
      throw new HttpException('Tag name already taken', HttpStatus.BAD_REQUEST);
    }

    const createdTag = await this.prisma.tag.create({ data: { name } });

    return createdTag;
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.tag.findUnique({ where: { id } });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.tag.delete({ where: { id } });
  }
}
