import { ApiProperty } from '@nestjs/swagger';
import { AddressModel } from './address.model';
import { Continent, Role } from 'prisma/generated/prisma';

/**
 * Class representing a user model
 */
export class UserModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'User id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'John',
    description: "User's first name",
  })
  firstName: string;

  @ApiProperty({
    type: 'string',
    example: 'Doe',
    description: "User's last name",
  })
  lastName: string;

  @ApiProperty({
    type: 'string',
    example: 'john@doe.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    type: () => AddressModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      city: 'Los Angeles',
      country: {
        id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
        name: 'United States',
        isoCode: 'US',
        continent: Continent.NORTH_AMERICA,
        population: 331000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      zip: '90001',
      streetName: 'Sunset Blvd',
      streetNumber: '100',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    description: 'Address id',
  })
  address: AddressModel;

  @ApiProperty({
    type: 'string',
    example: Role.ADMIN,
    description: "User's role",
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "User's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "User's updated at date",
  })
  updatedAt: Date;
}
