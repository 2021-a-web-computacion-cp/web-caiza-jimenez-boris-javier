import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, Param,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {MovieService} from "./movie.service";
import { Prisma } from '@prisma/client';
import {MovieCrearDto} from "./dto/movie-crear.dto";
import {validate} from "class-validator";
import {stringify} from "ts-jest/dist/utils/json";

@Controller('movie')
export  class MovieController{

    constructor(
        // Inyeccion dependencias
        private movieService: MovieService,
    ) {}


    @Get('lista-movies')
    async listaLibros(@Res() response, @Query() parametrosConsulta) {
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
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('movie/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }


    @Post('crear-movie-formulario')
    async crearUsuarioFormualrio(@Res() response, @Body() parametrosCuerpo) {


        const movieCrearDto = new MovieCrearDto();
        movieCrearDto.nombre = parametrosCuerpo.nombre;
        movieCrearDto.director = parametrosCuerpo.director;
        movieCrearDto.fechaEstreno = new Date(parametrosCuerpo.fechaEstreno);
        movieCrearDto.taquilla = parseFloat(parametrosCuerpo.taquilla);
        movieCrearDto.cartelera = !!(parametrosCuerpo.cartelera);

        try {

            const errores = await validate(movieCrearDto);
            if (errores.length > 0 ) {
                response.redirect(
                    '/movie/vista-crear' +
                    '?mensaje= Se ha ingresado mal los datos, por favor revicelos'
                );
                console.log(JSON,stringify(errores));
                throw new BadRequestException('No envia bien parametros: ');

            } else {
                await this.movieService.crearUno(movieCrearDto);
                response.redirect(
                    '/movie/vista-crear' +
                    '?mensaje= Se creo la pelicula ' +
                    parametrosCuerpo.nombre,
                );
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando libro');

        }
    }

    @Post('eliminar-movie/:idMovie')
    async eliminarLibro(@Res() response, @Param() parametrosRuta) {
        try {
            await this.movieService.eliminarUno(+parametrosRuta.idMovie);
            response.redirect(
                '/movie/lista-movies' + '?mensaje=Se elimino la pelicula',
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('actualizar-movie/:idMovie')
    async obtenerUno(@Res() response,  @Param() parametrosRuta) {
        try {
            const respuesta = await this.movieService.buscarUno(+parametrosRuta.idMovie);
            console.log("-----------------------------")
            console.log(respuesta)
            response.render('movie/actualizar', {
                datos: {
                    pelicula: respuesta,
                },

            });

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Error')
        }
    }


    @Post('actualizar-movie-formulario/:idMovie')
    async actualizarMovie(
        @Res() response,
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
    ) {


        const movieActualizarDto = new MovieCrearDto();
        movieActualizarDto.nombre = parametrosCuerpo.nombre;
        movieActualizarDto.director = parametrosCuerpo.director;
        movieActualizarDto.fechaEstreno = new Date(parametrosCuerpo.fechaEstreno);
        movieActualizarDto.taquilla = parseFloat(parametrosCuerpo.taquilla);
        movieActualizarDto.cartelera = !!(parametrosCuerpo.cartelera);
        try {
            const errores = await validate(movieActualizarDto);

            if (errores.length > 0) {
                response.redirect(
                    '/movie/lista-movies' +
                    '?mensaje=No se ha actualizado los datos, dado que estos han sido incorrectos'
                );
                console.log(JSON,stringify(errores));
                throw new BadRequestException('No envia bien parametros: ');


            } else {
                await this.movieService.actualizarUno({
                    id: +parametrosRuta.idMovie,
                    data: movieActualizarDto,
                });
                response.redirect(
                    '/movie/lista-movies' +
                    '?mensaje= Se actualizo la pelicula ' +
                    parametrosCuerpo.nombre,
                );
            }
        } catch (error) {
            throw new InternalServerErrorException('Error actualizando libro');
        }
    }



}