import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './infra/http/controller/user.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { LoginModule } from '@modules/user/login/login.module';

@Module({
  imports: [PrismaModule, LoginModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
