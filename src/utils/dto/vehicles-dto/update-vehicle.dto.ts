import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateAttributesDto } from './attributes/update-attributes.dto';
import { FuelType, Transmission } from 'prisma/generated/prisma';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

/**
 * Class representing an update vehicle dto
 */
export class UpdateVehicleDto extends PartialType(OmitType(CreateVehicleDto, ['attributes'])) {
  @ApiProperty({
    type: () => UpdateAttributesDto,
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
  @ValidateNested()
  @Type(() => UpdateAttributesDto)
  attributes: UpdateAttributesDto;
}
