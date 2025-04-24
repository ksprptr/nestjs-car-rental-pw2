import { ApiProperty } from '@nestjs/swagger';
import { Fuel, Transmission } from 'prisma/generated/prisma';

/**
 * Class representing a vehicle attributes model
 */
export class VehicleAttributesModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Vehicle attributes ID',
  })
  id: string;

  @ApiProperty({
    type: 'number',
    example: 2025,
    description: "Vehicle's manufacture year",
  })
  manufactureYear: number;

  @ApiProperty({
    type: 'number',
    example: 5,
    description: "Vehicle's number of seats",
  })
  seatCount: number;

  @ApiProperty({
    type: 'number',
    example: 186,
    description: "Vehicle's top speed in mph",
  })
  speedMph: number;

  @ApiProperty({
    type: 'number',
    example: 13,
    description: "Vehicle's fuel consumption in l/100km",
  })
  consumption: number;

  @ApiProperty({
    type: 'string',
    example: Fuel.BENZINE,
    description: "Vehicle's fuel type",
    enum: Fuel,
  })
  fuel: Fuel;

  @ApiProperty({
    type: 'string',
    example: Transmission.AUTOMATIC,
    description: "Vehicle's transmission type",
    enum: Transmission,
  })
  transmission: Transmission;
}
