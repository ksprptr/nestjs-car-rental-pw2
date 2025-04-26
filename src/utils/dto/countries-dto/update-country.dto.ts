import { PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';

/**
 * Class representing an update country dto
 */
export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
