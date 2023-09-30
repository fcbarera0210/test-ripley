import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateTasaResponse {
  @ApiProperty({
    example: HttpStatus.CREATED,
    description: 'Codigo HTTP de retorno',
  })
  status: number;

  @ApiProperty({
    example: 100,
    description: 'Valor de la cuota simulada',
  })
  ValorCuota: number;
}
