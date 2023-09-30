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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateTasaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CalculateTasaDto {
}
exports.CalculateTasaDto = CalculateTasaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rut del cliente', example: '11111111' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CalculateTasaDto.prototype, "RutCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Monto total del credito', example: 120000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 0 }),
    __metadata("design:type", Number)
], CalculateTasaDto.prototype, "MontoDelCredito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numero total de cuotas', example: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 0 }),
    __metadata("design:type", Number)
], CalculateTasaDto.prototype, "NumeroCuotas", void 0);
//# sourceMappingURL=calculate-tasa.dto.js.map