import { ApiProperty } from '@nestjs/swagger';

/**
 * Class representing a basic status response
 */
export class BasicStatusResponse {
  @ApiProperty({
    type: 'number',
    example: 0,
    description: 'Status code',
  })
  status: number;

  @ApiProperty({
    type: 'string',
    example: 'string',
    description: 'Status message',
  })
  message: string;
}
