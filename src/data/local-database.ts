
/**
 * REFACTORIZADO - PRINCIPIO DE INVERSIÓN DE DEPENDENCIAS (DIP)
 * 
 * Ahora ambos servicios de base de datos implementan una interfaz común.
 * Los módulos de alto nivel (PostService) dependen de abstracciones, no de implementaciones concretas.
 */

/**
 * Tipo para los posts de la reserva
 */
export interface Post {
    readonly id: number;
    readonly title: string;
    readonly body: string;
}

/**
 * Interfaz que define el contrato para cualquier proveedor de datos de posts
 * Esto permite cambiar entre LocalDatabaseService, JsonDatabaseService, etc.
 */
export interface IPostRepository {
    getPosts(): Promise<Post[]>;
}

/**
 * Implementación de repositorio usando datos locales en memoria
 * Responsabilidad única: proporcionar posts desde almacenamiento local
 */
export class LocalDatabaseService implements IPostRepository {
    async getPosts(): Promise<Post[]> {
        console.log('[LocalDatabaseService] Obteniendo posts desde almacenamiento local...');
        return [
            { 
                id: 1, 
                title: 'Avistamiento de Jaguar', 
                body: 'Se reportó un jaguar cerca del río en la zona norte de la reserva.' 
            },
            { 
                id: 2, 
                title: 'Nuevas Orquídeas Floridas', 
                body: 'Han florecido las especies raras en el jardín botánico de la reserva.' 
            },
            { 
                id: 3, 
                title: 'Monitoreo de Tortugas', 
                body: 'El equipo completó el censo anual de tortugas del río.' 
            }
        ];
    }
}

/**
 * Implementación de repositorio usando datos desde JSON
 * Responsabilidad única: proporcionar posts desde un archivo JSON
 */
export class JsonDatabaseService implements IPostRepository {
    async getPosts(): Promise<Post[]> {
        console.log('[JsonDatabaseService] Obteniendo posts desde almacenamiento JSON...');
        return [
            { 
                id: 1, 
                title: 'JSON Post 1', 
                body: 'Contenido desde archivo JSON' 
            },
            { 
                id: 2, 
                title: 'JSON Post 2', 
                body: 'Más contenido desde JSON' 
            }
        ];
    }
}

/**
 * Implementación de repositorio usando una API REST (ejemplo para extensión)
 * Esto demuestra que podemos agregar nuevas implementaciones sin modificar PostService
 */
export class ApiDatabaseService implements IPostRepository {
    constructor(private readonly apiUrl: string = 'https://api.example.com/posts') {}

    async getPosts(): Promise<Post[]> {
        console.log('[ApiDatabaseService] Obteniendo posts desde API...');
        // En un caso real, aquí haríamos fetch(this.apiUrl)
        return [];
    }
}
