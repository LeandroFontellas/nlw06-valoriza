import { Module } from '@nestjs/common';
import { ComplimentService } from './services/compliment.service';
import { ComplimentController } from './infra/http/controller/compliment.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';

@Module({
  controllers: [ComplimentController],
  providers: [ComplimentService],
  imports: [PrismaModule],
})
export class ComplimentModule {}
