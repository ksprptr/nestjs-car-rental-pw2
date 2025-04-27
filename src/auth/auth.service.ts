import ctx from 'src/ctx';
import { LoginDto } from 'src/utils/dto/auth-dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensModel } from 'src/utils/models/tokens.model';
import { RegisterDto } from 'src/utils/dto/auth-dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { FrontendUser } from 'src/utils/types/user.types';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Class representing an auth service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Function to login a user
   */
  async login(loginDto: LoginDto): Promise<TokensModel> {
    const user = await this.usersService.getByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await ctx.functions.password.compare(loginDto.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const frontendUser = await this.usersService.get(user.id);

    return {
      accessToken: this.jwtService.sign(frontendUser, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: this.jwtService.sign(frontendUser, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  /**
   * Function to register a new user
   */
  async register(registerDto: RegisterDto): Promise<TokensModel> {
    if (registerDto.password !== registerDto.passwordConfirmation) {
      throw new ConflictException('Passwords do not match');
    }

    const user = await this.usersService.create(registerDto);

    return {
      accessToken: this.jwtService.sign(user, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: this.jwtService.sign(user, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  /**
   * Function to refresh a token
   */
  async refreshToken(refreshToken: string): Promise<TokensModel> {
    try {
      const user: FrontendUser = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      if (!user) throw new UnauthorizedException('Invalid refresh token');

      const frontendUser = await this.usersService.get(user.id);

      if (!frontendUser) throw new NotFoundException('User not found');

      return {
        accessToken: this.jwtService.sign(frontendUser, {
          expiresIn: process.env.JWT_EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        }),
        refreshToken: this.jwtService.sign(frontendUser, {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
          secret: process.env.JWT_REFRESH_SECRET,
        }),
      };
    } catch (error) {
      switch (error.name) {
        case 'TokenExpiredError':
          throw new UnauthorizedException('Refresh token expired');
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid refresh token');
        default:
          throw new UnauthorizedException('Unauthorized');
      }
    }
  }
}
