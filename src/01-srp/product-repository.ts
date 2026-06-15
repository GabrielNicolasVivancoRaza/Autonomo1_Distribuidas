/**
 * Responsabilidad: Gestión de persistencia de productos
 * Implementa el patrón Repository para separar la lógica de acceso a datos
 */

export interface Product {
    readonly id: number;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
}

/**
 * Interfaz que define el contrato para cualquier proveedor de persistencia
 * Esto permite cambiar fácilmente entre diferentes tipos de almacenamiento
 */
export interface IProductRepository {
    findById(id: number): Product | undefined;
    save(product: Product): void;
    getAll(): Product[];
}

/**
 * Implementación local del repositorio de productos
 * Podría reemplazarse con una implementación que use API REST, SQL, etc.
 */
export class LocalProductRepository implements IProductRepository {
    private products: Product[] = [];

    findById(id: number): Product | undefined {
        console.log(`[ProductRepository] Buscando producto con ID: ${id}`);
        return this.products.find(p => p.id === id);
    }

    save(product: Product): void {
        const exists = this.products.findIndex(p => p.id === product.id) !== -1;
        if (exists) {
            console.log(`[ProductRepository] Actualizando producto: ${product.name}`);
            this.products = this.products.map(p => p.id === product.id ? product : p);
        } else {
            console.log(`[ProductRepository] Guardando nuevo producto: ${product.name}`);
            this.products.push(product);
        }
    }

    getAll(): Product[] {
        console.log(`[ProductRepository] Obteniendo todos los productos (total: ${this.products.length})`);
        return [...this.products];
    }
}
