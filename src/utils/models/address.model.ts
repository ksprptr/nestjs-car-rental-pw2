import { Continent } from 'prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { CountryModel } from './country.model';

/**
 * Class representing an address model
 */
export class AddressModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Address id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Los Angeles',
    description: "Address's city",
  })
  city: string;

  @ApiProperty({
    type: () => CountryModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      name: 'United States',
      isoCode: 'US',
      continent: Continent.NORTH_AMERICA,
      population: 331000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    description: "Address's country",
  })
  country?: CountryModel;

  @ApiProperty({
    type: 'string',
    example: '90001',
    description: "Address's zip code",
  })
  zip: string;

  @ApiProperty({
    type: 'string',
    example: 'Sunset Blvd',
    description: "Address's street",
  })
  streetName: string;

  @ApiProperty({
    type: 'string',
    example: '100',
    description: "Address's street number",
  })
  streetNumber: string;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Address's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Address's updated at date",
  })
  updatedAt: Date;
}
