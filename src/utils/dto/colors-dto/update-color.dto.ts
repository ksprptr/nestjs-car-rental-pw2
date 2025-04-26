import { PartialType } from '@nestjs/swagger';
import { CreateColorDto } from './create-color.dto';

/**
 * Class representing an update color dto
 */
export class UpdateColorDto extends PartialType(CreateColorDto) {}
