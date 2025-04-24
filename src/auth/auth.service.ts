import { LoginDto } from 'src/utils/dto/auth-dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenModel } from 'src/utils/models/token.model';
import { RegisterDto } from 'src/utils/dto/auth-dto/register.dto';

/**
 * Class representing an auth service
 */
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Function to login a user
   */
  async login(_loginDto: LoginDto): Promise<TokenModel> {
    return {
      accessToken: 'accessToken',
    };
  }

  /**
   * Function to register a new user
   */
  async register(_registerDto: RegisterDto): Promise<TokenModel> {
    return {
      accessToken: 'accessToken',
    };
  }
}
