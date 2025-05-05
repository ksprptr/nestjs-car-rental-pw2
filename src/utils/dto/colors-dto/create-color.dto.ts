import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Class representing a create color dto
 */
export class CreateColorDto {
  @ApiProperty({
    type: 'string',
    example: 'Midnight Blue',
    description: "Color's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: '#191970',
    description: "Color's hex code",
  })
  @IsHexColor()
  @IsNotEmpty()
  hex: string;

  @ApiProperty({
    type: 'number',
    example: 20,
    description: "Color's brightness level (0-100)",
  })
  @IsNumber()
  @IsNotEmpty()
  brightnessLevel: number;

  @ApiProperty({
    type: 'boolean',
    example: true,
    description: "Color's is metallic",
  })
  @IsBoolean()
  @IsNotEmpty()
  metallic: boolean;
}
