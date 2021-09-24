import {PrismaService} from "../prisma.service";
import {Injectable} from "@nestjs/common"
import { Prisma } from '@prisma/client';

@Injectable()
export class MovieService {
    constructor(
        // Inyectar dependencias
        private prisma: PrismaService,
    ) {}

    buscarUno(id: number) {
        return this.prisma.pelicula.findUnique({
            where: {
                id: id,
            },
        });
    }

    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }) {
        const or = parametrosBusqueda.busqueda
            ? {
                OR: [
                    { nombre: { contains: parametrosBusqueda.busqueda } },
                    { director: { contains: parametrosBusqueda.busqueda } },
                ],
            }
            : {};
        return this.prisma.pelicula.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined,
        });
    }

    crearUno(movie: Prisma.PeliculaCreateInput) {
        return this.prisma.pelicula.create({
            data: movie,
        });
    }

    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.PeliculaUpdateInput;
    }) {
        return this.prisma.pelicula.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }

    eliminarUno(id: number) {
        return this.prisma.pelicula.delete({
            where: { id: id },
        });
    }


}