import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { JwtAuthGuard, Public } from '@shared/auth/jwt-auth.guard';
import { AuthService } from '@shared/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get()
  async findOne(@Body('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Public()
  @Post('/auth/login')
  async auth(@Request() req) {
    return await this.authService.login(req.body);
  }
}
