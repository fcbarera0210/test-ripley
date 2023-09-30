import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Length,
  Min,
} from 'class-validator';

export class CalculateTasaDto {
  @ApiProperty({ description: 'Rut del cliente', example: '11111111' })
  @IsNotEmpty()
  @Length(1)
  @IsNumberString()
  RutCliente: string;

  @ApiProperty({ description: 'Monto total del credito', example: 120000 })
  @IsNotEmpty()
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 0 })
  MontoDelCredito: number;

  @ApiProperty({ description: 'Numero total de cuotas', example: 2 })
  @IsNotEmpty()
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 0 })
  NumeroCuotas: number;
}
