import { Tag as PrismaTag } from 'prisma/prisma-client';
export class Tag implements PrismaTag {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
