import { MovieService } from "./movie.service";
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    listaLibros(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearUsuarioFormualrio(response: any, parametrosCuerpo: any): Promise<void>;
    eliminarLibro(response: any, parametrosRuta: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    actualizarMovie(response: any, parametrosCuerpo: any, parametrosRuta: any): Promise<void>;
}
