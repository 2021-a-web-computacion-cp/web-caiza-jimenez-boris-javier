import { PeliculaService } from './pelicula.service';
export declare class PeliculaController {
    private peliculaService;
    constructor(peliculaService: PeliculaService);
    actualizarUno(response: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
}
