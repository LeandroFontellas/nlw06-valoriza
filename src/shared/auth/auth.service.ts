import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../hash/bcrypt.service';
import { LoginUserDto } from '@modules/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      if (await this.hashService.compare(pass, user.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const findUser = await this.userService.findByEmail(user.email);

    if (!findUser) {
      throw new HttpException(
        'Email/Password combination does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatched = await this.hashService.compare(
      user.password,
      findUser.password,
    );

    if (!isMatched) {
      throw new HttpException(
        'Email/Password combination does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      username: findUser.name,
      sub: findUser.id,
      admin: findUser.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
