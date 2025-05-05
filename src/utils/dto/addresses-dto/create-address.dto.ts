import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Class representing a create address dto
 */
export class CreateAddressDto {
  @ApiProperty({
    type: 'string',
    example: 'Los Angeles',
    description: "Address's city",
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Address's country id",
  })
  @IsString()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({
    type: 'string',
    example: '90001',
    description: "Address's zip code",
  })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({
    type: 'string',
    example: 'Sunset Blvd',
    description: "Address's street",
  })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({
    type: 'string',
    example: '100',
    description: "Address's street number",
  })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;
}
