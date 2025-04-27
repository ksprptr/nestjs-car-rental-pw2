import ctx from 'src/ctx';
import { UserModel } from 'src/utils/models/user.model';
import { VehicleModel } from 'src/utils/models/vehicle.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/utils/dto/users-dto/create-user.dto';
import { UpdateUserDto } from 'src/utils/dto/users-dto/update-user.dto';
import { AddressesService } from 'src/addresses/addresses.service';
import { Prisma, Role, User } from 'prisma/generated/prisma';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * Class representing a users service
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addressesService: AddressesService,
  ) {}

  /**
   * Function to get all users
   */
  async getAll(): Promise<UserModel[]> {
    return await this.prismaService.user.findMany({ select: ctx.selections.user.userSelect });
  }

  /**
   * Function to get a user by id
   */
  async get(id: string): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: ctx.selections.user.userSelect,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  /**
   * Function to get a user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * Function to get a user's vehicles
   */
  async getUserVehicles(id: string): Promise<VehicleModel[]> {
    return await this.prismaService.vehicle.findMany({
      where: { ownerId: id },
      select: ctx.selections.vehicle.vehicleSelect,
    });
  }

  /**
   * Function to get a user's vehicle by id
   */
  async getUserVehicle(userId: string, vehicleId: string): Promise<VehicleModel> {
    const vehicle = await this.prismaService.vehicle.findFirst({
      where: { id: vehicleId, ownerId: userId },
      select: ctx.selections.vehicle.vehicleSelect,
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return vehicle;
  }

  /**
   * Function to get a user's favourite vehicles
   */
  async getUserFavouriteVehicles(id: string): Promise<VehicleModel[]> {
    const vehicleIds = await this.prismaService.userFavouriteVehicle.findMany({
      where: { userId: id },
      select: { vehicleId: true },
    });

    return await this.prismaService.vehicle.findMany({
      where: { id: { in: vehicleIds.map((vehicle) => vehicle.vehicleId) } },
      select: ctx.selections.vehicle.vehicleSelect,
    });
  }

  /**
   * Function to create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new ConflictException('Passwords do not match');
    }

    try {
      const newUser = await this.prismaService.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: await ctx.functions.password.hash(createUserDto.password),
          role: Role.USER,
        },
        select: ctx.selections.user.userSelect,
      });

      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('User with that email already exists');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the user.',
      );
    }
  }

  /**
   * Function to update a user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    if (
      (updateUserDto.password || updateUserDto.passwordConfirmation) &&
      updateUserDto.password !== updateUserDto.passwordConfirmation
    ) {
      throw new ConflictException('Passwords do not match');
    }

    if (updateUserDto.addressId) {
      const address = await this.addressesService.get(updateUserDto.addressId);

      if (!address) {
        throw new NotFoundException('Address not found');
      }
    }

    try {
      const { passwordConfirmation: _, ...data } = updateUserDto;

      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data,
        select: ctx.selections.user.userSelect,
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('User with that email already exists');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the user.',
      );
    }
  }

  /**
   * Function to delete a user
   */
  async delete(id: string): Promise<UserModel> {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: { id },
        select: ctx.selections.user.userSelect,
      });

      return deletedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the user.',
      );
    }
  }
}
