import { Role } from 'prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a user model
 */
export class UserModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'User ID',
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
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Address ID',
  })
  addressId: string;

  @ApiProperty({
    type: 'string',
    example: Role.ADMIN,
    description: "User's role",
    enum: Role,
  })
  role: Role;
}
