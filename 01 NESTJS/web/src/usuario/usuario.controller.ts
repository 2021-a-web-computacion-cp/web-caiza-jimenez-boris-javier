
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';


// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(
        // Inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }

    @Post()
    crearUno(@Body() bodyParams) {
        //console.log("Hola 1");
        const objetoUsuario: Prisma.EPN_USUARIOCreateInput = {
            apellido: bodyParams.apellido,
            nombre: bodyParams.nombre,
        };
        //console.log(objetoUsuario);
        return this.usuarioService.crearUno(objetoUsuario);
    }


    @Put('/:idUsuario/:apellido/:nombre')
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
    }

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



    @Delete(':idUsuario')
    eliminarUno(@Param() parametro) {
        const objetoUsuario: Prisma.EPN_USUARIOWhereUniqueInput = {
            id: Number(parametro.idUsuario),
        };
        this.usuarioService.eliminarUno(objetoUsuario) ;
        return "se elimino el usuario"
    }


}