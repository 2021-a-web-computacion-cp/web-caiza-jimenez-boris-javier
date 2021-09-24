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
exports.peliculaActualizarDto = void 0;
const class_validator_1 = require("class-validator");
class peliculaActualizarDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(20),
    __metadata("design:type", String)
], peliculaActualizarDto.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(10),
    __metadata("design:type", String)
], peliculaActualizarDto.prototype, "director", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], peliculaActualizarDto.prototype, "fechaEstreno", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(10000000000),
    __metadata("design:type", Number)
], peliculaActualizarDto.prototype, "taquilla", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Boolean)
], peliculaActualizarDto.prototype, "cartelera", void 0);
exports.peliculaActualizarDto = peliculaActualizarDto;
//# sourceMappingURL=pelicula-actualizar.js.map