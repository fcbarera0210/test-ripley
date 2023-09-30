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
exports.TrxLog = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let TrxLog = class TrxLog {
};
exports.TrxLog = TrxLog;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrxLog.prototype, "id_TRX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-09-29T23:01:57.505Z' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TrxLog.prototype, "fecha_TRX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '{"RutCliente":"11","MontoDelCredito":100,"NumeroCuotas":2}',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TrxLog.prototype, "json_TRX", void 0);
exports.TrxLog = TrxLog = __decorate([
    (0, typeorm_1.Entity)({
        name: 'TRX_LOG',
    })
], TrxLog);
//# sourceMappingURL=trx-log.entity.js.map