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
exports.peliculaCrearDto = void 0;
const class_validator_1 = require("class-validator");
class peliculaCrearDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(25),
    __metadata("design:type", String)
], peliculaCrearDto.prototype, "nombre", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(25),
    __metadata("design:type", String)
], peliculaCrearDto.prototype, "director", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], peliculaCrearDto.prototype, "taquilla", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], peliculaCrearDto.prototype, "fechaEstreno", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Boolean)
], peliculaCrearDto.prototype, "cartelera", void 0);
exports.peliculaCrearDto = peliculaCrearDto;
//# sourceMappingURL=pelicula-crear.dto.js.map