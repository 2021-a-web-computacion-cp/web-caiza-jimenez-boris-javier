import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class PeliculaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Pelicula[]>;
    buscarUno(id: number): Prisma.Prisma__PeliculaClient<import(".prisma/client").Pelicula>;
    crearUno(pelicula: Prisma.PeliculaCreateInput): Prisma.Prisma__PeliculaClient<import(".prisma/client").Pelicula>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.PeliculaUpdateInput;
    }): Prisma.Prisma__PeliculaClient<import(".prisma/client").Pelicula>;
    eliminarUno(id: number): Prisma.Prisma__PeliculaClient<import(".prisma/client").Pelicula>;
}
