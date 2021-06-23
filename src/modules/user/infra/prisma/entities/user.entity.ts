import { User as PrismaUser } from 'prisma/prisma-client';
export class User implements PrismaUser {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
}
