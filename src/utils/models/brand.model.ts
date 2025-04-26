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
    description: 'Brand ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'BMW',
    description: "Brand's name",
  })
  name: string;

  @ApiProperty({
    type: () => CountryModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      name: 'Germany',
      isoCode: 'DE',
      continent: Continent.EUROPE,
      population: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    description: "Brand's country",
  })
  country: CountryModel;

  @ApiProperty({
    type: 'number',
    example: 1916,
    description: "Brand's founded year",
  })
  foundedYear: number;

  @ApiProperty({
    type: 'string',
    example:
      'Bayerische Motoren Werke AG, trading as BMW Group (commonly abbreviated to BMW, sometimes anglicised as Bavarian Motor Works), is a German multinational manufacturer of vehicles and motorcycles headquartered in Munich, Bavaria, Germany.',
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
