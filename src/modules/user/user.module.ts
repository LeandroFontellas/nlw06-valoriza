import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './infra/http/controller/user.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { BcryptModule } from './providers/hash/bcrypt.module';
import { AuthModule } from './providers/auth/auth.module';

@Module({
  imports: [PrismaModule, BcryptModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
