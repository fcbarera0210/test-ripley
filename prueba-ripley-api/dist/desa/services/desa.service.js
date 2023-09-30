"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesaService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const trx_log_entity_1 = require("../entities/trx-log.entity");
let DesaService = class DesaService {
    constructor(trxRepository) {
        this.trxRepository = trxRepository;
    }
    calculateTasa(total, cuotas, tasa = 3) {
        return Math.round((total / cuotas) * (1 + tasa / 100));
    }
    async saveTasa(calculateTasaDto) {
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
    async getSimulationByRut(rut) {
        const tasas = await this.trxRepository.find({
            where: {
                json_TRX: (0, typeorm_1.Like)(`%RutCliente":"${rut}"%`),
            },
            order: {
                fecha_TRX: 'DESC',
            },
        });
        if (tasas.length === 0) {
            throw new common_1.NotFoundException(`Simulaciones para el rut ${rut} no encontradas`);
        }
        return tasas;
    }
};
exports.DesaService = DesaService;
exports.DesaService = DesaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(trx_log_entity_1.TrxLog)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DesaService);
//# sourceMappingURL=desa.service.js.map