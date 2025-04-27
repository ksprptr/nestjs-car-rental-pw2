import { PartialType } from '@nestjs/swagger';
import { CreateAttributesDto } from './create-attributes.dto';

/**
 * Class representing an update attributes dto
 */
export class UpdateAttributesDto extends PartialType(CreateAttributesDto) {}
