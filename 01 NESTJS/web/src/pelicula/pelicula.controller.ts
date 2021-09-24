import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Query, Res
} from '@nestjs/common';

import { PeliculaService } from './pelicula.service';
import { Prisma } from '@prisma/client';
import {validate} from "class-validator";
import {stringify} from "ts-jest/dist/utils/json";
import {peliculaCrearDto} from "../pelicula/dto/pelicula-crear.dto";


// http://localhost:3000/usuario/......
@Controller('pelicula')
export class PeliculaController{
    constructor(
        private peliculaService: PeliculaService,
    ) {}




    @Post('eliminar-pelicula/:idPelicula')
    async eliminarUsuario(
        @Res() response,
        @Param() parametrosRuta){
        try {
            await  this.peliculaService.eliminarUno(+parametrosRuta.idPelicula);
            response.redirect('/pelicula/lista-peliculas' + '?mensaje=Se elimino la pelicula');
        }catch (error){
            console.error(error)
            throw new InternalServerErrorException('Error')
        }
    }

    @Post(':actualizar-pelicula/:idPelicula')
    async obtenerUno(@Res() response,  @Param() parametrosRuta) {
        try {
            const respuesta = await this.peliculaService.buscarUno(+parametrosRuta.idPelicula);
            console.log("-----------------------------")
            console.log(respuesta)
            response.render('pelicula/actualizar', {
                datos: {
                    pelicula: respuesta,
                },

            });

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Error')
        }
    }

    @Post('actualizar-pelicula-formulario/:idPelicula')
    async actualizarUno(@Res() response,  @Param() parametrosRuta, @Body() parametrosCuerpo) {
        const pelicula:Prisma.PeliculaUpdateInput = {
            nombre: parametrosCuerpo.nombre,
            director:  parametrosCuerpo.director,
            fechaEstreno: new Date(parametrosCuerpo.fechaEstreno),
            taquilla:  parseFloat(parametrosCuerpo.taquilla),
            cartelera: !!(parametrosCuerpo.cartelera),
        }
        const parametrosActualizar = {
            id: Number(parametrosRuta.idPelicula),
            data: pelicula,
        };
        try {
            await this.peliculaService.actualizarUno(parametrosActualizar);
            response.redirect('/pelicula/lista-peliculas');
        } catch (error) {
            console.log({error: error, mensaje: 'Errores en crear pelicula'});
            throw new InternalServerErrorException("Error del servidor");
        }


    }









    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('pelicula/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },

        });
    }

    @Post('crear-pelicula-formulario')
    async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
        const peliculaDto = new peliculaCrearDto()
        peliculaDto.nombre = parametrosCuerpo.nombre;
        peliculaDto.director = parametrosCuerpo.director;
        peliculaDto.fechaEstreno = new Date(parametrosCuerpo.fechaEstreno);
        peliculaDto.taquilla = +parametrosCuerpo.taquilla;
        peliculaDto.cartelera = !!(parametrosCuerpo.cartelera);
        try {
            const errores = await validate(peliculaDto)
            if(errores.length > 0){
                console.log(JSON,stringify(errores));
                throw new BadRequestException("No envía bien parametros");
            }else{
                return this.peliculaService.crearUno(peliculaDto);
                response.redirect('/pelicula/vista-crear' + '?mensaje= Se creo la pelicula ' + parametrosCuerpo.nombre,);
            }

        }catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario')
        }
    }



    @Get('lista-peliculas')
    async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
        try{
            //Validar parametros de consulta con un dto
            const respuesta = await this.peliculaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined ,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined ,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log('-----------------------------');
            console.log(respuesta);
            response.render('pelicula/lista',{
                datos:{
                    peliculas: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }catch (error) {
            throw    new InternalServerErrorException('Error del servidor')
        }

    }

}