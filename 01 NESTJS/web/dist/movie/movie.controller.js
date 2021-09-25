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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_crear_dto_1 = require("./dto/movie-crear.dto");
const class_validator_1 = require("class-validator");
const json_1 = require("ts-jest/dist/utils/json");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async listaLibros(response, parametrosConsulta) {
        try {
            const respuesta = await this.movieService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('movie/lista', {
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
    vistaCrear(response, parametrosConsulta) {
        response.render('movie/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async crearUsuarioFormualrio(response, parametrosCuerpo) {
        const movieCrearDto = new movie_crear_dto_1.MovieCrearDto();
        movieCrearDto.nombre = parametrosCuerpo.nombre;
        movieCrearDto.director = parametrosCuerpo.director;
        movieCrearDto.fechaEstreno = new Date(parametrosCuerpo.fechaEstreno);
        movieCrearDto.taquilla = parseFloat(parametrosCuerpo.taquilla);
        movieCrearDto.cartelera = !!(parametrosCuerpo.cartelera);
        try {
            const errores = await class_validator_1.validate(movieCrearDto);
            if (errores.length > 0) {
                response.redirect('/movie/vista-crear' +
                    '?mensaje= Se ha ingresado mal los datos, por favor revicelos');
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.movieService.crearUno(movieCrearDto);
                response.redirect('/movie/vista-crear' +
                    '?mensaje= Se creo la pelicula ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando libro');
        }
    }
    async eliminarLibro(response, parametrosRuta) {
        try {
            await this.movieService.eliminarUno(+parametrosRuta.idMovie);
            response.redirect('/movie/lista-movies' + '?mensaje=Se elimino la pelicula');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async obtenerUno(response, parametrosRuta) {
        try {
            const respuesta = await this.movieService.buscarUno(+parametrosRuta.idMovie);
            console.log("-----------------------------");
            console.log(respuesta);
            response.render('movie/actualizar', {
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
    async actualizarMovie(response, parametrosCuerpo, parametrosRuta) {
        const movieActualizarDto = new movie_crear_dto_1.MovieCrearDto();
        movieActualizarDto.nombre = parametrosCuerpo.nombre;
        movieActualizarDto.director = parametrosCuerpo.director;
        movieActualizarDto.fechaEstreno = new Date(parametrosCuerpo.fechaEstreno);
        movieActualizarDto.taquilla = parseFloat(parametrosCuerpo.taquilla);
        movieActualizarDto.cartelera = !!(parametrosCuerpo.cartelera);
        try {
            const errores = await class_validator_1.validate(movieActualizarDto);
            if (errores.length > 0) {
                response.redirect('/movie/lista-movies' +
                    '?mensaje=No se ha actualizado los datos, dado que estos han sido incorrectos');
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.movieService.actualizarUno({
                    id: +parametrosRuta.idMovie,
                    data: movieActualizarDto,
                });
                response.redirect('/movie/lista-movies' +
                    '?mensaje= Se actualizo la pelicula ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error actualizando libro');
        }
    }
};
__decorate([
    common_1.Get('lista-movies'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "listaLibros", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-movie-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "crearUsuarioFormualrio", null);
__decorate([
    common_1.Post('eliminar-movie/:idMovie'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "eliminarLibro", null);
__decorate([
    common_1.Post('actualizar-movie/:idMovie'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post('actualizar-movie-formulario/:idMovie'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "actualizarMovie", null);
MovieController = __decorate([
    common_1.Controller('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map