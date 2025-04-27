import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

/**
 * Class representing an update address dto
 */
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
