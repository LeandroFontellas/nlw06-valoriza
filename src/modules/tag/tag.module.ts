import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './infra/http/controller/tag.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
