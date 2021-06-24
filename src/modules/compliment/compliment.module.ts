import { Module } from '@nestjs/common';
import { ComplimentService } from './services/compliment.service';
import { ComplimentController } from './infra/http/controller/compliment.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { JwtAuthGuard } from '@modules/user/providers/auth/jwt-auth.guard';
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
