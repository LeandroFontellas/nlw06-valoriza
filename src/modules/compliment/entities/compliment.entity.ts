import { Compliment as PrismaCompliment } from '.prisma/client';
export class Compliment implements PrismaCompliment {
  id: string;
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
  created_at: Date;
}
