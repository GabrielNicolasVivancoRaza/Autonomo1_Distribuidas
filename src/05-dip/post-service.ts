
/**
 * REFACTORIZADO - PRINCIPIO DE INVERSIÓN DE DEPENDENCIAS (DIP)
 * 
 * PostService ahora depende de una abstracción (IPostRepository),
 * no de una implementación concreta (LocalDatabaseService).
 * 
 * DIP: Los módulos de alto nivel no deben depender de módulos de bajo nivel.
 * Ambos deben depender de abstracciones.
 */

import { IPostRepository, Post } from '../data/local-database';

/**
 * PostService - Servicio de publicaciones para la reserva
 * 
 * Inyectamos el repositorio como dependencia en el constructor.
 * Esto permite:
 * - Cambiar entre LocalDatabaseService, JsonDatabaseService, ApiDatabaseService sin modificar PostService
 * - Testing fácil con un mock/stub de IPostRepository
 * - Máxima flexibilidad y testabilidad
 */
export class PostService {

    private posts: Post[] = [];

    /**
     * Inyección de dependencia: PostService recibe el repositorio como parámetro
     * No lo instancia directamente. Respeta completamente DIP.
     */
    constructor(private readonly postRepository: IPostRepository) {}

    /**
     * Obtener todos los posts disponibles
     */
    async getPosts(): Promise<Post[]> {
        console.log('[PostService] Obteniendo posts desde el repositorio inyectado...');
        
        try {
            this.posts = await this.postRepository.getPosts();
            console.log(`[PostService] Se obtuvieron ${this.posts.length} posts`);
            return this.posts;
        } catch (error) {
            console.error('[PostService] Error al obtener posts:', error);
            return [];
        }
    }

    /**
     * Obtener un post específico por ID
     */
    getPostById(id: number): Post | undefined {
        console.log(`[PostService] Buscando post con ID ${id}`);
        return this.posts.find(post => post.id === id);
    }

    /**
     * Buscar posts por título (contiene la cadena)
     */
    searchByTitle(query: string): Post[] {
        console.log(`[PostService] Buscando posts con título que contenga: "${query}"`);
        return this.posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * Obtener cantidad total de posts
     */
    getTotalCount(): number {
        return this.posts.length;
    }
}
