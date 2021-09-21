
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Res
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
import {UsuarioCrearDto} from "./dto/usuario-crear.dto";
import {validate} from "class-validator";
import {stringify} from "ts-jest/dist/utils/json";


// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(
        // Inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}


    @Get('inicio')
    inicio(@Res() response) {
        response.render('inicio');
    }

    @Get('lista-usuarios')
    listaUsuarios(@Res() response) {
        response.render('usuario/lista');
    }




    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }

    @Post()
    async crearUno(@Body() parametrosCuerpo) {
        const usuarioCrearDto = new UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;

        try {
            const errores = await validate(usuarioCrearDto);
            if(errores.length > 0){
                console.log(JSON,stringify(errores));
                throw new BadRequestException("No envía bien parametros");
            }else{
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        } catch (error) {
            console.log({error: error, mensaje: 'Errores en crear usuario'});
            throw new InternalServerErrorException("Error del servidor");
        }

    }


    @Put(':idUsuario')
    async actualizarUno(@Body() parametrosCuerpo, @Param() parametrosRuta) {
        const usuarioActualizarDto = new UsuarioCrearDto();
        usuarioActualizarDto.nombre = parametrosCuerpo.nombre;
        usuarioActualizarDto.apellido = parametrosCuerpo.apellido;
        usuarioActualizarDto.fechaCreacion = parametrosCuerpo.fechaCreacion;

        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: usuarioActualizarDto,
        };
        try {
            const errores = await validate(usuarioActualizarDto);
            if(errores.length > 0){
                console.log(JSON,stringify(errores));
                throw new BadRequestException("No envía bien parametros");
            }else{
                return this.usuarioService.actualizarUno(parametrosActualizar);
            }
        } catch (error) {
            console.log({error: error, mensaje: 'Errores en crear usuario'});
            throw new InternalServerErrorException("Error del servidor");
        }

    }

    @Delete(':idUsuario')
    async eliminarUno(@Param() parametrosRuta) {

        const id = Number(parametrosRuta.idUsuario);

        return this.usuarioService.eliminarUno(id);


    }

    /*@Post()
    crearUno(@Body() bodyParams) {
        //console.log("Hola 1");
        const objetoUsuario: Prisma.EPN_USUARIOCreateInput = {
            apellido: bodyParams.apellido,
            nombre: bodyParams.nombre,
        };
        //console.log(objetoUsuario);
        return this.usuarioService.crearUno(objetoUsuario);
    }*/


   /* @Put('/:idUsuario/:apellido/:nombre')
    actualizarUno(@Param() params) {
        const objetoWhere: Prisma.EPN_USUARIOWhereUniqueInput = {
            id: Number(params.idUsuario),
        };
        const objetoUsuarioUpdate: Prisma.EPN_USUARIOUpdateInput = {
            apellido: params.apellido,
            nombre: params.nombre,
        };

        const parametrosActualizar = {
            where: objetoWhere,
            data: objetoUsuarioUpdate,
        };

        return this.usuarioService.actualizarUno(parametrosActualizar);
    }*/

    /*
    *  actualizarUno(parametrosActualizar: {
        where: Prisma.EPN_USUARIOWhereUniqueInput;
        data: Prisma.EPN_USUARIOUpdateInput;
    }) {
        return this.prisma.ePN_USUARIO.update({
            data: parametrosActualizar.data,
            where: parametrosActualizar.where,
        });
    }*/



   /* @Delete(':idUsuario')
    eliminarUno(@Param() parametro) {
        const objetoUsuario: Prisma.EPN_USUARIOWhereUniqueInput = {
            id: Number(parametro.idUsuario),
        };
        this.usuarioService.eliminarUno(objetoUsuario) ;
        return "se elimino el usuario"
    }*/


}