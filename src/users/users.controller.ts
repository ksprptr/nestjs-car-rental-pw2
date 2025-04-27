import { Role } from 'prisma/generated/prisma';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserModel } from 'src/utils/models/user.model';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { UsersService } from './users.service';
import { FrontendUser } from 'src/utils/types/user.types';
import { VehicleModel } from 'src/utils/models/vehicle.model';
import { CreateUserDto } from 'src/utils/dto/users-dto/create-user.dto';
import { UpdateUserDto } from 'src/utils/dto/users-dto/update-user.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  Get,
  Req,
  Body,
  Post,
  Param,
  Patch,
  Delete,
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
  @ApiOkResponse({ type: [UserModel], description: 'Users' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AccessGuard)
  @Get()
  async getAll(): Promise<UserModel[]> {
    return this.usersService.getAll();
  }

  /**
   * Controller to get a user by id
   */
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: UserModel, description: 'User' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'User not found' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.get(id);
  }

  /**
   * Controller to get a user's vehicles
   */
  @ApiOperation({ summary: "Get a user's vehicles" })
  @ApiOkResponse({ type: [VehicleModel], description: "User's vehicles" })
  @Get(':id/vehicles')
  async getUserVehicles(@Param('id') id: string): Promise<VehicleModel[]> {
    return this.usersService.getUserVehicles(id);
  }

  /**
   * Controller to get a user's vehicle by id
   */
  @ApiOperation({ summary: "Get a user's vehicle by id" })
  @ApiOkResponse({ type: VehicleModel, description: "User's vehicle" })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Vehicle not found' })
  @Get(':userId/vehicles/:vehicleId')
  async getUserVehicle(
    @Param('userId') userId: string,
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleModel> {
    return this.usersService.getUserVehicle(userId, vehicleId);
  }

  /**
   * Controller to create a new user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserModel, description: 'Created user' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Passwords do not match or user with that email already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while creating the user',
  })
  @UseGuards(AuthGuard, AccessGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Controller to update a user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ type: UserModel, description: 'Updated user' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({
    type: BasicStatusResponse,
    description: 'You are not allowed to change the user role',
  })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'User or address not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Passwords do not match or user with that email already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while updating the user',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ): Promise<UserModel> {
    const user: FrontendUser = request['user'];

    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('Forbidden');
    }

    return this.usersService.update(id, updateUserDto, user.role === Role.ADMIN);
  }

  /**
   * Controller to delete a user
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ type: UserModel, description: 'Deleted user' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'User not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description:
      'Cannot delete the last admin or user cannot be deleted due to existing references',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while deleting the user',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: Request): Promise<UserModel> {
    const user: FrontendUser = request['user'];

    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('Forbidden');
    }

    return this.usersService.delete(id);
  }
}
