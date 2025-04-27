import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributesDto } from './attributes/create-attributes.dto';
import { FuelType, Transmission } from 'prisma/generated/prisma';
import {
  IsNumber,
  IsObject,
  IsString,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Class representing a create vehicle dto
 */
export class CreateVehicleDto {
  @ApiProperty({
    type: 'string',
    example: 'M5',
    description: "Vehicle's model",
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: 'number',
    example: 123100,
    description: "Vehicle's price in USD",
  })
  @IsNumber()
  @IsNotEmpty()
  priceUsd: number;

  @ApiProperty({
    type: () => CreateAttributesDto,
    example: {
      manufactureYear: 2025,
      seatCount: 5,
      topSpeedMph: 186,
      fuelConsumption: 13,
      fuelType: FuelType.BENZINE,
      transmission: Transmission.AUTOMATIC,
      mileage: 1200,
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
