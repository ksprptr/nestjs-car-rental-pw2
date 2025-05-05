import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributesDto } from './attributes/create-attributes.dto';
import { FuelType, Transmission } from 'prisma/generated/prisma';
import {
  IsNumber,
  IsObject,
  IsString,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

/**
 * Class representing a create vehicle dto
 */
export class CreateVehicleDto {
  @ApiProperty({
    type: 'string',
    example: 'Mustang GT',
    description: "Vehicle's model",
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: 'number',
    example: 42000,
    description: "Vehicle's price in USD",
  })
  @IsNumber()
  @IsNotEmpty()
  priceUsd: number;

  @ApiProperty({
    type: () => CreateAttributesDto,
    example: {
      manufactureYear: 2022,
      seatCount: 4,
      topSpeedMph: 165,
      fuelConsumption: 20.1,
      fuelType: FuelType.BENZINE,
      transmission: Transmission.MANUAL,
      mileage: 12000,
    },
    description: "Vehicle's attributes",
  })
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateAttributesDto)
  attributes: CreateAttributesDto;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Vehicle's brand id",
  })
  @IsString()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Vehicle's color id",
  })
  @IsString()
  @IsNotEmpty()
  colorId: string;
}
