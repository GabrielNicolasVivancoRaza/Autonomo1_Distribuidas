/**
 * Abstracción para clientes HTTP
 * Permite usar diferentes implementaciones (axios, fetch, etc.)
 * sin modificar los servicios que los usan.
 * 
 * PRINCIPIO OPEN/CLOSED: La clase es CERRADA para modificación
 * pero ABIERTA para extensión a través de nuevas implementaciones.
 */

export interface HttpResponse<T = any> {
    status: number;
    data: T;
}

/**
 * Interfaz que define el contrato para cualquier cliente HTTP
 */
export interface IHttpClient {
    get<T = any>(url: string): Promise<HttpResponse<T>>;
    post<T = any>(url: string, data: any): Promise<HttpResponse<T>>;
}

/**
 * Implementación usando Axios
 * Si mañana queremos cambiar a fetch, solo creamos una nueva implementación.
 * No necesitamos modificar NewsService ni PhotosService.
 */
export class AxiosHttpClient implements IHttpClient {
    async get<T = any>(url: string): Promise<HttpResponse<T>> {
        console.log(`[AxiosHttpClient] GET ${url}`);
        // En una aplicación real, aquí usaríamos import axios
        // const response = await axios.get(url);
        // return { status: response.status, data: response.data };
        
        // Simulación para este ejemplo:
        return {
            status: 200,
            data: [] as T,
        };
    }

    async post<T = any>(url: string, data: any): Promise<HttpResponse<T>> {
        console.log(`[AxiosHttpClient] POST ${url}`, data);
        return {
            status: 201,
            data: {} as T,
        };
    }
}

/**
 * Implementación usando Fetch API (Nativa del navegador)
 * Esto ejemplifica cómo podemos extender sin modificar servicios existentes.
 */
export class FetchHttpClient implements IHttpClient {
    async get<T = any>(url: string): Promise<HttpResponse<T>> {
        console.log(`[FetchHttpClient] GET ${url}`);
        const response = await fetch(url);
        return {
            status: response.status,
            data: await response.json() as T,
        };
    }

    async post<T = any>(url: string, data: any): Promise<HttpResponse<T>> {
        console.log(`[FetchHttpClient] POST ${url}`, data);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return {
            status: response.status,
            data: await response.json() as T,
        };
    }
}

/**
 * Implementación Mock para testing
 * Permite testear sin hacer llamadas reales a la API
 */
export class MockHttpClient implements IHttpClient {
    async get<T = any>(url: string): Promise<HttpResponse<T>> {
        console.log(`[MockHttpClient] Retornando datos mock para GET ${url}`);
        return {
            status: 200,
            data: [] as T,
        };
    }

    async post<T = any>(url: string, data: any): Promise<HttpResponse<T>> {
        console.log(`[MockHttpClient] Retornando datos mock para POST ${url}`);
        return {
            status: 201,
            data: {} as T,
        };
    }
}
