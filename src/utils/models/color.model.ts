import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a color model
 */
export class ColorModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Color ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Black',
    description: "Color's name",
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: '#000000',
    description: "Color's hex code",
  })
  hex: string;

  @ApiProperty({
    type: 'number',
    example: 100,
    description: "Color's brightness level (0-100)",
  })
  brightness: number;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: "Color's is metallic",
  })
  metallic: boolean;
}
