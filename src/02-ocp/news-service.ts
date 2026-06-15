/**
 * REFACTORIZADO - PRINCIPIO ABIERTO/CERRADO (OCP)
 * 
 * Los servicios ahora dependen de una abstracción (IHttpClient),
 * no de una implementación concreta (axios).
 * 
 * Esto hace que el código sea:
 * - CERRADO para modificación: NewsService y PhotosService no cambian si alteramos el cliente HTTP
 * - ABIERTO para extensión: Podemos crear nuevas implementaciones de IHttpClient sin tocar estos servicios
 */

import { IHttpClient } from './http-client';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

/**
 * Servicio de noticias de la Reserva Ecológica
 * Responsabilidad: Obtener noticias del sistema
 * Inyectamos el cliente HTTP para máxima flexibilidad
 */
export class NewsService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private readonly httpClient: IHttpClient) {}

    async getLatestNews(): Promise<Post[]> {
        console.log('[NewsService] Obteniendo noticias de la reserva biológica...');
        const response = await this.httpClient.get<Post[]>(this.apiUrl);
        
        if (response.status !== 200) {
            throw new Error(`Error al obtener noticias: ${response.status}`);
        }

        console.log(`[NewsService] Noticias obtenidas (${response.data.length} items)`);
        return response.data;
    }
}

/**
 * Servicio de galería de fotos de la Reserva
 * Responsabilidad: Obtener fotos del sistema
 * Inyectamos el cliente HTTP para máxima flexibilidad
 */
export class PhotosService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/photos';

    constructor(private readonly httpClient: IHttpClient) {}

    async getGallery(): Promise<Photo[]> {
        console.log('[PhotosService] Obteniendo galería de fotos...');
        const response = await this.httpClient.get<Photo[]>(this.apiUrl);
        
        if (response.status !== 200) {
            throw new Error(`Error al obtener fotos: ${response.status}`);
        }

        console.log(`[PhotosService] Fotos obtenidas (${response.data.length} items)`);
        return response.data;
    }
}
