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
exports.PeliculaController = void 0;
const common_1 = require("@nestjs/common");
const pelicula_service_1 = require("./pelicula.service");
let PeliculaController = class PeliculaController {
    constructor(peliculaService) {
        this.peliculaService = peliculaService;
    }
    async actualizarUno(response, parametrosRuta, parametrosCuerpo) {
        const pelicula = {
            nombre: parametrosCuerpo.nombre,
            director: parametrosCuerpo.director,
            taquilla: parseFloat(parametrosCuerpo.taquilla),
            cartelera: !!(parametrosCuerpo.cartelera),
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idPelicula),
            data: pelicula,
        };
        try {
            await this.peliculaService.actualizarUno(parametrosActualizar);
            response.redirect('/pelicula/lista-peliculas');
        }
        catch (error) {
            console.log({ error: error, mensaje: 'Errores en crear pelicula' });
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async obtenerUno(response, parametrosRuta) {
        try {
            const respuesta = await this.peliculaService.buscarUno(+parametrosRuta.idPelicula);
            console.log("-----------------------------");
            console.log(respuesta);
            response.render('pelicula/actualizar', {
                datos: {
                    pelicula: respuesta,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async eliminarUsuario(response, parametrosRuta) {
        try {
            await this.peliculaService.eliminarUno(+parametrosRuta.idPelicula);
            response.redirect('/pelicula/lista-peliculas' + '?mensaje=Se elimino la pelicula');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('pelicula/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async crearUsuarioFormulario(response, parametrosCuerpo) {
        try {
            const rerspuestaUsuario = await this.peliculaService.crearUno({
                nombre: parametrosCuerpo.nombre,
                director: parametrosCuerpo.director,
                taquilla: parseFloat(parametrosCuerpo.taquilla),
                cartelera: !!(parametrosCuerpo.cartelera)
            });
            response.redirect('/pelicula/vista-crear' + '?mensaje= Se creo la pelicula ' + parametrosCuerpo.nombre);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
    async listaUsuarios(response, parametrosConsulta) {
        try {
            const respuesta = await this.peliculaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log('-----------------------------');
            console.log(respuesta);
            response.render('pelicula/lista', {
                datos: {
                    peliculas: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
};
__decorate([
    common_1.Post('actualizar-pelicula-formulario/:idPelicula'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeliculaController.prototype, "actualizarUno", null);
__decorate([
    common_1.Post(':actualizar-pelicula/:idPelicula'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeliculaController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post('eliminar-pelicula/:idPelicula'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeliculaController.prototype, "eliminarUsuario", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PeliculaController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-pelicula-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeliculaController.prototype, "crearUsuarioFormulario", null);
__decorate([
    common_1.Get('lista-peliculas'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeliculaController.prototype, "listaUsuarios", null);
PeliculaController = __decorate([
    common_1.Controller('pelicula'),
    __metadata("design:paramtypes", [pelicula_service_1.PeliculaService])
], PeliculaController);
exports.PeliculaController = PeliculaController;
//# sourceMappingURL=pelicula.controller.js.map