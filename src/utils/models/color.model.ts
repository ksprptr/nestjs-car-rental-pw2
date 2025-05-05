import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a color model
 */
export class ColorModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Color id',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Midnight Blue',
    description: "Color's name",
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: '#191970',
    description: "Color's hex code",
  })
  hex: string;

  @ApiProperty({
    type: 'number',
    example: 20,
    description: "Color's brightness level (0-100)",
  })
  brightnessLevel: number;

  @ApiProperty({
    type: 'boolean',
    example: true,
    description: "Color's is metallic",
  })
  metallic: boolean;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Color's created at date",
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    example: new Date(),
    description: "Color's updated at date",
  })
  updatedAt: Date;
}
