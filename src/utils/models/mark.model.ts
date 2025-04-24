import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a mark model
 */
export class MarkModel {
  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: 'Mark ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'BMW',
    description: "Mark's name",
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'cd760a96-e3ac-4517-bdea-753253bdb0e0',
    description: "Mark's founded country ID",
  })
  countryId: string;

  @ApiProperty({
    type: 'number',
    example: 1916,
    description: "Mark's founded year",
  })
  foundedYear: number;

  @ApiProperty({
    type: 'string',
    example:
      'Bayerische Motoren Werke AG, trading as BMW Group (commonly abbreviated to BMW, sometimes anglicised as Bavarian Motor Works), is a German multinational manufacturer of vehicles and motorcycles headquartered in Munich, Bavaria, Germany.',
    description: "Mark's description",
  })
  description: string;
}
