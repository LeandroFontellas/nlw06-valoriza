import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './infra/http/controller/user.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
