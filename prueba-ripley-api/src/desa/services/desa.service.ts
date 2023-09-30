import { Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrxLog } from '../entities/trx-log.entity';
import { CalculateTasaDto } from '../dto/calculate-tasa.dto';

@Injectable()
export class DesaService {
  constructor(
    @InjectRepository(TrxLog)
    private readonly trxRepository: Repository<TrxLog>,
  ) {}

  calculateTasa(total: number, cuotas: number, tasa = 3): number {
    return Math.round((total / cuotas) * (1 + tasa / 100));
  }

  async saveTasa(calculateTasaDto: CalculateTasaDto): Promise<number> {
    const { MontoDelCredito, NumeroCuotas } = calculateTasaDto;

    const tasa = this.calculateTasa(MontoDelCredito, NumeroCuotas);
    const saveData = {
      request: calculateTasaDto,
      response: {
        valorCuota: tasa,
      },
    };

    const data = { json_TRX: JSON.stringify(saveData) };

    await this.trxRepository.save(data);

    return tasa;
  }

  async getSimulationByRut(rut: string): Promise<TrxLog[]> {
    const tasas = await this.trxRepository.find({
      where: {
        json_TRX: Like(`%RutCliente":"${rut}"%`),
      },
      order: {
        fecha_TRX: 'DESC',
      },
    });

    if (tasas.length === 0) {
      throw new NotFoundException(
        `Simulaciones para el rut ${rut} no encontradas`,
      );
    }

    return tasas;
  }
}
