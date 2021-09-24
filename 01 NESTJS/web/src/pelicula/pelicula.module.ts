import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import {PeliculaService} from "../pelicula/pelicula.service";
import {PeliculaController} from "../pelicula/pelicula.controller";


@Module({
    imports: [
        // modulos importados
    ],
    providers: [
        // declaramos servicio
        PeliculaService,
        PrismaService,
    ],
    exports: [
        // exportamos servicio
        PeliculaService,
    ],
    controllers: [
        // declaramos controladores
        PeliculaController,
    ],
})


export class  PeliculaModule{}