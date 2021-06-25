import { UserService } from '@modules/user/services/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { CreateComplimentDto } from '../dto/create-compliment.dto';
import { UpdateComplimentDto } from '../dto/update-compliment.dto';

@Injectable()
export class ComplimentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
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
