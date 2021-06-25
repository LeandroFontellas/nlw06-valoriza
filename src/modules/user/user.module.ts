import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { BcryptModule } from '@shared/hash/bcrypt.module';
import { AuthModule } from '@shared/auth/auth.module';

@Module({
  imports: [PrismaModule, BcryptModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
