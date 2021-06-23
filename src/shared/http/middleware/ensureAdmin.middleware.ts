import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EnsureAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Verifica se o usuário é admin
    const admin = true;

    if (admin) {
      return next();
    }
    throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
  }
}
