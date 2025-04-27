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
  @ValidateNested()
  @Type(() => UpdateAttributesDto)
  attributes: UpdateAttributesDto;
}
