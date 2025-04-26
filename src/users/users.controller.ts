import { Role } from 'prisma/generated/prisma';
import { FullUser } from 'src/utils/types/user.types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserModel } from 'src/utils/models/user.model';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/utils/dto/users-dto/create-user.dto';
import { UpdateUserDto } from 'src/utils/dto/users-dto/update-user.dto';
import { Request as ERequest } from 'express';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Request,
  UseGuards,
  Controller,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Class representing a users controller
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Controller to get all users
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [UserModel], description: 'Users found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  async getAll(): Promise<UserModel[]> {
    return this.usersService.getAll();
  }

  /**
   * Controller to get a user by id
   */
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: UserModel, description: 'User found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.get(id);
  }

  /**
   * Controller to create a new user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ type: UserModel, description: 'User created' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Controller to update a user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ type: UserModel, description: 'User updated' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: ERequest,
  ): Promise<UserModel> {
    const user: FullUser = request['user'];

    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Controller to delete a user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ type: UserModel, description: 'User deleted' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() request: ERequest): Promise<UserModel> {
    const user: FullUser = request['user'];

    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }

    return this.usersService.delete(id);
  }
}
