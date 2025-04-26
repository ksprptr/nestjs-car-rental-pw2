import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Class representing a create brand dto
 */
export class CreateBrandDto {
  @ApiProperty({
    type: 'string',
    example: 'BMW',
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
    example: 1916,
    description: "Brand's founded year",
  })
  @IsNumber()
  @IsNotEmpty()
  foundedYear: number;

  @ApiProperty({
    type: 'string',
    example:
      'Bayerische Motoren Werke AG, trading as BMW Group (commonly abbreviated to BMW, sometimes anglicised as Bavarian Motor Works), is a German multinational manufacturer of vehicles and motorcycles headquartered in Munich, Bavaria, Germany.',
    description: "Brand's description",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
