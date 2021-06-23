import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './infra/http/controller/tag.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { EnsureAdminMiddleware } from '@shared/http/middleware/ensureAdmin.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAdminMiddleware)
      .forRoutes({ path: 'tag', method: RequestMethod.POST });
  }
}
