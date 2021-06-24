import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '@modules/user/providers/auth/auth.service';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Request() req) {
    return this.authService.login(req.body);
  }
}
