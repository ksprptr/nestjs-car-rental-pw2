import { Role } from 'prisma/generated/prisma';
import { Request } from 'express';
import { FullUser } from 'src/utils/types/user.types';
import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Class representing an admin guard
 */
@Injectable()
export class AdminGuard {
  /**
   * Function to check if user is an admin
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: FullUser = request['user'];

    if (!user) throw new UnauthorizedException('Unauthorized');
    if (user.role !== Role.ADMIN) throw new ForbiddenException('Forbidden');

    return true;
  }
}
