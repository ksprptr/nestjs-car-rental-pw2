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
    type: () => VehicleAttributesModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
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
  attributes: VehicleAttributesModel;

  @ApiProperty({
    type: () => BrandModel,
    example: {
      id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
      name: 'BMW',
      country: {
        id: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
        name: 'Germany',
        isoCode: 'DE',
        continent: Continent.EUROPE,
        population: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      foundedYear: 1916,
      description:
        'Bayerische Motoren Werke AG, trading as BMW Group (commonly abbreviated to BMW, sometimes anglicised as Bavarian Motor Works), is a German multinational manufacturer of vehicles and motorcycles headquartered in Munich, Bavaria, Germany.',
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
      name: 'Black',
      hex: '#000000',
      brightnessLevel: 100,
      metallic: false,
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
