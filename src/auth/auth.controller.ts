import { LoginDto } from 'src/utils/dto/auth-dto/login.dto';
import { TokenModel } from 'src/utils/models/token.model';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/utils/dto/auth-dto/register.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

/**
 * Class representing an auth controller
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login controller
   */
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({ type: TokenModel, description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Invalid credentials' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenModel> {
    return this.authService.login(loginDto);
  }

  /**
   * Register controller
   */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: TokenModel, description: 'User registered successfully' })
  @HttpCode(200)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokenModel> {
    return this.authService.register(registerDto);
  }
}
