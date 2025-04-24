import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Class representing a register dto
 */
export class RegisterDto {
  @ApiProperty({
    type: 'string',
    example: 'John',
    description: "User's first name",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: 'string',
    example: 'Doe',
    description: "User's last name",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: 'string',
    example: 'john@doe.com',
    description: "User's email address",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'SuperSecretPassword1234',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
