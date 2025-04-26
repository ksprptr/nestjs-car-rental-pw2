import { UserModel } from 'src/utils/models/user.model';
import { Prisma, Role, User } from 'prisma/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/utils/dto/users-dto/create-user.dto';
import { UpdateUserDto } from 'src/utils/dto/users-dto/update-user.dto';
import { AddressesService } from 'src/addresses/addresses.service';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import ctx from 'src/ctx';

/**
 * Class representing a users service
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addressesService: AddressesService,
  ) {}

  // Selection object for a user
  public readonly userSelect: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    password: false,
    address: {
      select: this.addressesService.addressSelect,
    },
    addressId: false,
    role: true,
    createdAt: true,
    updatedAt: true,
    _count: false,
    vehicles: false,
  };

  /**
   * Function to get a user by id
   */
  async get(id: string): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Function to get all users
   */
  async getAll(): Promise<UserModel[]> {
    return await this.prismaService.user.findMany({ select: this.userSelect });
  }

  /**
   * Function to get a user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
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
        select: this.userSelect,
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

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
        select: this.userSelect,
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
        select: this.userSelect,
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
