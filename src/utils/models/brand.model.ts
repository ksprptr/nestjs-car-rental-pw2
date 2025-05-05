import { Continent } from 'prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { CountryModel } from './country.model';

/**
 * Class representing a brand model
 */
export class BrandModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Brand id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Ford',
    description: "Brand's name",
  })
  name: string;

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
    description: "Brand's country",
  })
  country?: CountryModel;

  @ApiProperty({
    type: 'number',
    example: 1903,
    description: "Brand's founded year",
  })
  foundedYear: number;

  @ApiProperty({
    type: 'string',
    example: 'American multinational automaker headquartered in Dearborn, Michigan.',
    description: "Brand's description",
  })
  description: string;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Brand's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Brand's updated at date",
  })
  updatedAt: Date;
}
