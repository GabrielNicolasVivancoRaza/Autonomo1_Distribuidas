/**
 * REFACTORIZADO - PRINCIPIO DE RESPONSABILIDAD ÚNICA (SRP)
 * 
 * Ahora el ProductBloc tiene UNA ÚNICA responsabilidad:
 * Gestionar la lógica de negocio del inventario de productos de la tienda de souvenirs.
 * 
 * Las responsabilidades de persistencia y notificaciones están delegadas a servicios especializados.
 */

import { IProductRepository, Product } from './product-repository';
import { INotificationService } from './notification-service';

/**
 * ProductBloc: Responsabilidad única - Lógica de negocio del inventario
 * 
 * Inyectamos las dependencias (Repository y NotificationService) como parámetros,
 * lo que permite:
 * - Fácil testing (mock de dependencias)
 * - Cambiar implementaciones sin modificar ProductBloc
 * - Máxima cohesión y mínimo acoplamiento
 */
export class ProductBloc {

    constructor(
        private readonly productRepository: IProductRepository,
        private readonly notificationService: INotificationService
    ) {}

    /**
     * Cargar un producto del repositorio
     * Responsabilidad: lógica de negocio
     */
    loadProduct(id: number): Product | undefined {
        console.log(`[ProductBloc] Cargando producto con ID: ${id}`);
        const product = this.productRepository.findById(id);
        
        if (!product) {
            console.log(`[ProductBloc] Producto no encontrado`);
            return undefined;
        }

        console.log(`[ProductBloc] Producto encontrado: ${product.name}`);
        return product;
    }

    /**
     * Guardar un nuevo producto
     * Responsabilidad: orquestar la persistencia
     */
    saveProduct(product: Product): void {
        console.log(`[ProductBloc] Iniciando guardado de producto: ${product.name}`);
        this.productRepository.save(product);
    }

    /**
     * Notificar a un cliente sobre una acción (ej. producto disponible)
     * Responsabilidad: orquestar notificaciones
     * 
     * NOTA: El ProductBloc NO conoce los detalles de cómo se envía la notificación.
     * Simplemente delega al servicio inyectado.
     */
    notifyCustomerAboutProduct(email: string, productName: string): void {
        const message = `El producto "${productName}" está disponible en nuestra tienda de souvenirs.`;
        console.log(`[ProductBloc] Iniciando notificación al cliente`);
        this.notificationService.notify(email, message);
    }

    /**
     * Obtener inventario completo
     * Responsabilidad: orquestar consulta
     */
    getInventory(): Product[] {
        console.log(`[ProductBloc] Obteniendo inventario completo`);
        return this.productRepository.getAll();
    }

}
