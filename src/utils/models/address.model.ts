import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing an address model
 */
export class AddressModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Address ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'New York',
    description: "Address's city",
  })
  city: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Address's country",
  })
  countryId: string;

  @ApiProperty({
    type: 'string',
    example: '012345',
    description: "Address's zip code",
  })
  zip: string;

  @ApiProperty({
    type: 'string',
    example: 'Main St',
    description: "Address's street",
  })
  streetName: string;

  @ApiProperty({
    type: 'string',
    example: '123',
    description: "Address's street number",
  })
  streetNumber: string;
}
