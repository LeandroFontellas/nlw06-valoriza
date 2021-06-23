import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { TagModule } from '@modules/tag/tag.module';
import { ComplimentModule } from '@modules/compliment/compliment.module';

@Module({
  imports: [UserModule, TagModule, ComplimentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
