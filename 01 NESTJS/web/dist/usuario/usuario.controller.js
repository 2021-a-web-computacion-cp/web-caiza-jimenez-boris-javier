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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const usuario_crear_dto_1 = require("./dto/usuario-crear.dto");
const class_validator_1 = require("class-validator");
const json_1 = require("ts-jest/dist/utils/json");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    listaUsuarios(response) {
        response.render("inicio");
    }
    obtenerUno(parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }
    async crearUno(parametrosCuerpo) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const errores = await class_validator_1.validate(usuarioCrearDto);
            if (errores.length > 0) {
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException("No envía bien parametros");
            }
            else {
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        }
        catch (error) {
            console.log({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async actualizarUno(parametrosCuerpo, parametrosRuta) {
        const usuarioActualizarDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioActualizarDto.nombre = parametrosCuerpo.nombre;
        usuarioActualizarDto.apellido = parametrosCuerpo.apellido;
        usuarioActualizarDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: usuarioActualizarDto,
        };
        try {
            const errores = await class_validator_1.validate(usuarioActualizarDto);
            if (errores.length > 0) {
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException("No envía bien parametros");
            }
            else {
                return this.usuarioService.actualizarUno(parametrosActualizar);
            }
        }
        catch (error) {
            console.log({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async eliminarUno(parametrosRuta) {
        const id = Number(parametrosRuta.idUsuario);
        return this.usuarioService.eliminarUno(id);
    }
};
__decorate([
    common_1.Get('lista-usuarios'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    common_1.Get(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idUsuario'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUno", null);
UsuarioController = __decorate([
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map