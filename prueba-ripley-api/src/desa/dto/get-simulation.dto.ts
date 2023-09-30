import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetSimulationDto {
  @ApiProperty({
    description: 'Rut del cliente',
    example: '11111111',
  })
  @IsNotEmpty()
  @IsNumberString()
  rut: string;
}
