import { ApiProperty } from '@nestjs/swagger';
import { FuelType, Transmission } from 'prisma/generated/prisma';

/**
 * Class representing a vehicle attributes model
 */
export class VehicleAttributesModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Vehicle attributes id',
  })
  id: string;

  @ApiProperty({
    type: 'number',
    example: 2022,
    description: "Vehicle's manufacture year",
  })
  manufactureYear: number;

  @ApiProperty({
    type: 'number',
    example: 4,
    description: "Vehicle's number of seats",
  })
  seatCount: number;

  @ApiProperty({
    type: 'number',
    example: 165,
    description: "Vehicle's top speed in mph",
  })
  topSpeedMph: number;

  @ApiProperty({
    type: 'number',
    example: 20.1,
    description: "Vehicle's fuel consumption in l/100km",
  })
  fuelConsumption: number;

  @ApiProperty({
    type: 'string',
    example: FuelType.BENZINE,
    description: "Vehicle's fuel type",
    enum: FuelType,
  })
  fuelType: FuelType;

  @ApiProperty({
    type: 'string',
    example: Transmission.MANUAL,
    description: "Vehicle's transmission type",
    enum: Transmission,
  })
  transmission: Transmission;

  @ApiProperty({
    type: 'number',
    example: 12000,
    description: "Vehicle's mileage in km",
  })
  mileage: number;
}
