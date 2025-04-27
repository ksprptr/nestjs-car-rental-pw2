import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Class representing a login dto
 */
export class LoginDto {
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
