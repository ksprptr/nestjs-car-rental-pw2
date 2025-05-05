import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Class representing a create brand dto
 */
export class CreateBrandDto {
  @ApiProperty({
    type: 'string',
    example: 'Ford',
    description: "Brand's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Address's country id",
  })
  @IsString()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({
    type: 'number',
    example: 1903,
    description: "Brand's founded year",
  })
  @IsNumber()
  @IsNotEmpty()
  foundedYear: number;

  @ApiProperty({
    type: 'string',
    example: 'American multinational automaker headquartered in Dearborn, Michigan.',
    description: "Brand's description",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
