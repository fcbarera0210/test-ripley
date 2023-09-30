import { Repository } from 'typeorm';
import { TrxLog } from '../entities/trx-log.entity';
import { CalculateTasaDto } from '../dto/calculate-tasa.dto';
export declare class DesaService {
    private readonly trxRepository;
    constructor(trxRepository: Repository<TrxLog>);
    calculateTasa(total: number, cuotas: number, tasa?: number): number;
    saveTasa(calculateTasaDto: CalculateTasaDto): Promise<number>;
    getSimulationByRut(rut: string): Promise<TrxLog[]>;
}
