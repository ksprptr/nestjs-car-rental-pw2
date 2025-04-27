import { Role } from 'prisma/generated/prisma';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * Class representing an update user dto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "User's address id",
  })
  @IsString()
  @IsOptional()
  addressId?: string;

  @ApiProperty({
    type: 'string',
    example: Role.ADMIN,
    description: "User's role",
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
