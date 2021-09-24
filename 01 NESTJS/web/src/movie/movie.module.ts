import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [
        // modulos importados
    ],
    providers: [
        // declaramos servicio
        MovieService,
        PrismaService,
    ],
    exports: [
        // exportamos servicio
        MovieService,
    ],
    controllers: [
        // declaramos controladores
        MovieController,
    ],
})
export class MovieModule{}