import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * Class representing an auth guard
 */
@Injectable()
export class AuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Function to check if the user is authenticated
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Unauthorized');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }

  /**
   * Function to extract token from the request headers
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization;

    if (token) {
      if (!token.startsWith('Bearer ')) {
        throw new UnauthorizedException("Invalid token format. Expected 'Bearer <token>'");
      }

      return token.split(' ')[1];
    }
  }
}
