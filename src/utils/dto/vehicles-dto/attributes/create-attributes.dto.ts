import { ApiProperty } from '@nestjs/swagger';
import { FuelType, Transmission } from 'prisma/generated/prisma';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Class representing a create attributes dto
 */
export class CreateAttributesDto {
  @ApiProperty({
    type: 'number',
    example: 2022,
    description: "Vehicle's manufacture year",
  })
  @IsNumber()
  @IsNotEmpty()
  manufactureYear: number;

  @ApiProperty({
    type: 'number',
    example: 4,
    description: "Vehicle's number of seats",
  })
  @IsNumber()
  @IsNotEmpty()
  seatCount: number;

  @ApiProperty({
    type: 'number',
    example: 165,
    description: "Vehicle's top speed in mph",
  })
  @IsNumber()
  @IsNotEmpty()
  topSpeedMph: number;

  @ApiProperty({
    type: 'number',
    example: 20.1,
    description: "Vehicle's fuel consumption in l/100km",
  })
  @IsNumber()
  @IsNotEmpty()
  fuelConsumption: number;

  @ApiProperty({
    type: 'string',
    example: FuelType.BENZINE,
    description: "Vehicle's fuel type",
    enum: FuelType,
  })
  @IsEnum(FuelType)
  @IsNotEmpty()
  fuelType: FuelType;

  @ApiProperty({
    type: 'string',
    example: Transmission.MANUAL,
    description: "Vehicle's transmission type",
    enum: Transmission,
  })
  @IsEnum(Transmission)
  @IsNotEmpty()
  transmission: Transmission;

  @ApiProperty({
    type: 'number',
    example: 12000,
    description: "Vehicle's mileage in km",
  })
  @IsNumber()
  @IsNotEmpty()
  mileage: number;
}
