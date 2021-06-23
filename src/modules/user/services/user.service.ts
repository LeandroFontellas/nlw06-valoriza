import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@modules/user/infra/prisma/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create({ name, email, password, admin }: CreateUserDto): Promise<User> {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (findUserByEmail) {
      throw new HttpException(
        'Email already in use',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const createUser = await this.prisma.user.create({
      data: { name, email, password, admin },
    });

    return createUser;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
