import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@modules/user/entities/user.entity';
import { BcryptService } from '@shared/hash/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly hash: BcryptService,
  ) {}
  async create({ name, email, password, admin }: CreateUserDto): Promise<User> {
    if (!email) {
      throw new HttpException('Email cannot be empty', HttpStatus.BAD_REQUEST);
    }

    const findUserByEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (findUserByEmail) {
      throw new HttpException(
        'Email already in use',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const hashedPassword = await this.hash.hash(password);

    const createUser = await this.prisma.user.create({
      data: { name, email, password: hashedPassword, admin },
    });

    return createUser;
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findByEmail(email: string): Promise<User> {
    const findUser = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async findOne(id: string): Promise<User> {
    const findUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.prisma.user.findFirst({ where: { id: id } });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
