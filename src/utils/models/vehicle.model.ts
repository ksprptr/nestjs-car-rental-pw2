import { BrandModel } from './brand.model';
import { ColorModel } from './color.model';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleAttributesModel } from './vehicle-attributes.model';
import { Continent, FuelType, Transmission } from 'prisma/generated/prisma';

/**
 * Class representing a vehicle model
 */
export class VehicleModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Vehicle id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Mustang GT',
    description: "Vehicle's model",
  })
  model: string;

  @ApiProperty({
    type: 'number',
    example: 42000,
    description: "Vehicle's price in USD",
  })
  priceUsd: number;

  @ApiProperty({
    type: () => VehicleAttributesModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
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
  attributes: VehicleAttributesModel;

  @ApiProperty({
    type: () => BrandModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      name: 'Ford',
      country: {
        id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
        name: 'United States',
        isoCode: 'US',
        continent: Continent.NORTH_AMERICA,
        population: 331000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      foundedYear: 1903,
      description: 'American multinational automaker headquartered in Dearborn, Michigan.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    description: "Vehicle's brand",
  })
  brand: BrandModel;

  @ApiProperty({
    type: () => ColorModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      name: 'Midnight Blue',
      hex: '#191970',
      brightnessLevel: 20,
      metallic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    description: "Vehicle's color",
  })
  color: ColorModel;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Vehicle's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Vehicle's updated at date",
  })
  updatedAt: Date;
}
