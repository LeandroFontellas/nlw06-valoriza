import { Module } from '@nestjs/common';
import { ComplimentService } from './compliment.service';
import { ComplimentController } from './compliment.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [ComplimentController],
  providers: [
    ComplimentService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [PrismaModule, UserModule],
})
export class ComplimentModule {}
