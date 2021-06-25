import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { CreateComplimentDto } from './dto/create-compliment.dto';
import { UpdateComplimentDto } from './dto/update-compliment.dto';

@Injectable()
export class ComplimentService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: CreateComplimentDto) {
    if (user_receiver === user_sender) {
      throw new HttpException(
        'You can not send a compliment to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    // verifica se existe o receiver
    const checkIfReceiverExists = await this.prisma.user.findUnique({
      where: { id: user_receiver },
    });

    if (!checkIfReceiverExists) {
      throw new HttpException('Receiver does not exist', HttpStatus.NOT_FOUND);
    }

    const compliment = await this.prisma.compliment.create({
      data: {
        message,
        tag_id,
        user_receiver,
        user_sender,
      },
    });

    return compliment;
  }

  async findAll() {
    return await this.prisma.compliment.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.compliment.findUnique({ where: { id } });
  }

  async update(id: string, updateComplimentDto: UpdateComplimentDto) {
    return await this.prisma.compliment.update({
      where: { id },
      data: updateComplimentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.compliment.delete({ where: { id } });
  }
}
