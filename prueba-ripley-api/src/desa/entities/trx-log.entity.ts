import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'TRX_LOG',
})
export class TrxLog {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id_TRX: number;

  @ApiProperty({ example: '2023-09-29T23:01:57.505Z' })
  @CreateDateColumn()
  fecha_TRX: Date;

  @ApiProperty({
    example: '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
  })
  @Column()
  json_TRX: string;
}
