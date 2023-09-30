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
exports.DesaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const desa_service_1 = require("../services/desa.service");
const calculate_tasa_dto_1 = require("../dto/calculate-tasa.dto");
const calculate_tasa_response_1 = require("../responses/calculate-tasa.response");
const trx_log_entity_1 = require("../entities/trx-log.entity");
const get_simulation_dto_1 = require("../dto/get-simulation.dto");
let DesaController = class DesaController {
    constructor(desaService) {
        this.desaService = desaService;
    }
    async calculateTasa(calculateTasaDto) {
        let valorCuota;
        try {
            valorCuota = await this.desaService.saveTasa(calculateTasaDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error calculando la cuota');
        }
        return {
            status: common_1.HttpStatus.CREATED,
            ValorCuota: valorCuota,
        };
    }
    async getSimulations(getSimulationDto) {
        const { rut } = getSimulationDto;
        let tasas;
        try {
            tasas = await this.desaService.getSimulationByRut(rut);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Error al obtener las simulaciones del rut ${rut}`);
        }
        return tasas;
    }
};
exports.DesaController = DesaController;
__decorate([
    (0, common_1.Post)('gettasa'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Calcula una nueva simulacion',
        type: calculate_tasa_response_1.CalculateTasaResponse,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Error de validacion',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Error inmanejable',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_tasa_dto_1.CalculateTasaDto]),
    __metadata("design:returntype", Promise)
], DesaController.prototype, "calculateTasa", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Obtener las simulaciones por rut',
        type: [trx_log_entity_1.TrxLog],
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Simulaciones no encontradas',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Error de validacion',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Error inmanejable',
    }),
    (0, common_1.Get)(':rut'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_simulation_dto_1.GetSimulationDto]),
    __metadata("design:returntype", Promise)
], DesaController.prototype, "getSimulations", null);
exports.DesaController = DesaController = __decorate([
    (0, swagger_1.ApiTags)('desa'),
    (0, common_1.Controller)('desa'),
    __metadata("design:paramtypes", [desa_service_1.DesaService])
], DesaController);
//# sourceMappingURL=desa.controller.js.map