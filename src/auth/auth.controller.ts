import { LoginDto } from 'src/utils/dto/auth-dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserModel } from 'src/utils/models/user.model';
import { AuthService } from './auth.service';
import { TokensModel } from 'src/utils/models/tokens.model';
import { RegisterDto } from 'src/utils/dto/auth-dto/register.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Get,
  Req,
  Body,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Class representing an auth controller
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Controller to login a user
   */
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({ type: TokensModel, description: 'User logged in' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Invalid credentials' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokensModel> {
    return this.authService.login(loginDto);
  }

  /**
   * Controller to register a new user
   */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: TokensModel, description: 'User registered' })
  @ApiConflictResponse({ type: BasicStatusResponse, description: 'Passwords do not match' })
  @HttpCode(200)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokensModel> {
    return this.authService.register(registerDto);
  }

  /**
   * Controller to refresh a token
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh a token' })
  @ApiOkResponse({ type: TokensModel, description: 'New tokens' })
  @ApiUnauthorizedResponse({
    type: BasicStatusResponse,
    description: 'Unauthorized, invalid refresh token or refresh token expired',
  })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('refresh')
  async refreshToken(@Req() request: Request): Promise<TokensModel> {
    const refreshToken = request.headers['x-refresh-token'];

    if (!refreshToken) throw new UnauthorizedException('Refresh token not found');

    return this.authService.refreshToken(refreshToken);
  }

  /**
   * Controller to get a user by token
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get currently logged in user' })
  @ApiOkResponse({ type: UserModel, description: 'Currently logged in user' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() request: Request): Promise<UserModel> {
    const { exp: _exp, iat: _iat, ...user } = request['user'];

    return user;
  }
}
