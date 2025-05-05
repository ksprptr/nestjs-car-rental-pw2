import { Continent } from 'prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Class representing a create country dto
 */
export class CreateCountryDto {
  @ApiProperty({
    type: 'string',
    example: 'United States',
    description: 'Country name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'US',
    description: 'Country ISO code',
  })
  @IsString()
  @IsNotEmpty()
  isoCode: string;

  @ApiProperty({
    type: 'string',
    example: Continent.NORTH_AMERICA,
    description: 'Country continent',
    enum: Continent,
  })
  @IsEnum(Continent)
  @IsNotEmpty()
  continent: Continent;

  @ApiProperty({
    type: 'number',
    example: 331000000,
    description: 'Country population',
  })
  @IsNumber()
  @IsNotEmpty()
  population: number;
}
