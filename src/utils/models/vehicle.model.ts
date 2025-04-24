import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a vehicle model
 */
export class VehicleModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Vehicle ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'M5',
    description: "Vehicle's model",
  })
  model: string;

  @ApiProperty({
    type: 'number',
    example: 123100,
    description: "Vehicle's price in USD",
  })
  priceUsd: number;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Vehicle's attributes ID",
  })
  attributesId: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Vehicle's mark ID",
  })
  markId: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Vehicle's color ID",
  })
  colorId: string;
}
