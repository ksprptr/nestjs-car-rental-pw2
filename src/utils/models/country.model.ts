import { Continent } from 'prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a country model
 */
export class CountryModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Country id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'United States',
    description: "Country's name",
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'US',
    description: "Country's iso code",
  })
  isoCode: string;

  @ApiProperty({
    type: 'string',
    example: Continent.NORTH_AMERICA,
    description: "Country's continent",
    enum: Continent,
  })
  continent: Continent;

  @ApiProperty({
    type: 'number',
    example: 331000000,
    description: "Country's population",
  })
  population: number;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Country's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Country's updated at date",
  })
  updatedAt: Date;
}
