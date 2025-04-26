import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';

/**
 * Class representing an update brand dto
 */
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
