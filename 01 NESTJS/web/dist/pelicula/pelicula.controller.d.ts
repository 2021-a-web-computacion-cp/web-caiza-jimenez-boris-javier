import { PeliculaService } from './pelicula.service';
export declare class PeliculaController {
    private peliculaService;
    constructor(peliculaService: PeliculaService);
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    actualizarUno(response: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<import(".prisma/client").Pelicula>;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
}
