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
exports.HistoricoPaciente = void 0;
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../paciente/entities/paciente.entity");
const prontuario_entity_1 = require("./prontuario.entity");
let HistoricoPaciente = class HistoricoPaciente {
    id;
    paciente;
    prontuario;
    data_registro;
    observacoes;
};
exports.HistoricoPaciente = HistoricoPaciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistoricoPaciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente),
    (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
    __metadata("design:type", paciente_entity_1.Paciente)
], HistoricoPaciente.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prontuario_entity_1.Prontuario),
    (0, typeorm_1.JoinColumn)({ name: 'prontuario_id' }),
    __metadata("design:type", prontuario_entity_1.Prontuario)
], HistoricoPaciente.prototype, "prontuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], HistoricoPaciente.prototype, "data_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistoricoPaciente.prototype, "observacoes", void 0);
exports.HistoricoPaciente = HistoricoPaciente = __decorate([
    (0, typeorm_1.Entity)('historico_pacientes')
], HistoricoPaciente);
//# sourceMappingURL=historico-paciente.entity.js.map