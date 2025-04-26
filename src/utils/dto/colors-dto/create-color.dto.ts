import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Class representing a create color dto
 */
export class CreateColorDto {
  @ApiProperty({
    type: 'string',
    example: 'Black',
    description: "Color's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: '#000000',
    description: "Color's hex code",
  })
  @IsHexColor()
  @IsNotEmpty()
  hex: string;

  @ApiProperty({
    type: 'number',
    example: 100,
    description: "Color's brightness level (0-100)",
  })
  @IsNumber()
  @IsNotEmpty()
  brightnessLevel: number;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: "Color's is metallic",
  })
  @IsBoolean()
  @IsNotEmpty()
  metallic: boolean;
}
