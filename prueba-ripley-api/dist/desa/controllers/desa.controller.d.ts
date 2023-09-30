import { DesaService } from '../services/desa.service';
import { CalculateTasaDto } from '../dto/calculate-tasa.dto';
import { CalculateTasaResponse } from '../responses/calculate-tasa.response';
import { TrxLog } from '../entities/trx-log.entity';
import { GetSimulationDto } from '../dto/get-simulation.dto';
export declare class DesaController {
    private readonly desaService;
    constructor(desaService: DesaService);
    calculateTasa(calculateTasaDto: CalculateTasaDto): Promise<CalculateTasaResponse>;
    getSimulations(getSimulationDto: GetSimulationDto): Promise<TrxLog[]>;
}
