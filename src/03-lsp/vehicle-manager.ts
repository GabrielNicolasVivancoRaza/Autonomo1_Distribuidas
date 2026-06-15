/**
 * REFACTORIZADO - PRINCIPIO DE SUSTITUCIÓN DE LISKOV (LSP)
 * 
 * Ahora existe una interfaz común Vehicle que todas las marcas respetan.
 * El cliente puede tratar a todos los vehículos de la misma manera,
 * sin necesidad de hacer type checks ni conocer detalles específicos de cada marca.
 * 
 * LSP: Las subclases pueden reemplazar a su clase base sin romper el contrato.
 */

/**
 * Interfaz que define el contrato que TODO vehículo debe cumplir
 * Cada marca implementará esto de su propia manera
 */
export interface Vehicle {
    readonly brand: string;
    readonly model: string;
    
    /**
     * Obtener información legible del vehículo
     * Este es el contrato que todas las marcas respetan
     */
    getInfo(): string;
    
    /**
     * Preparar el vehículo para la conducción
     */
    prepare(): void;
}

/**
 * Tesla - Implementa el contrato de Vehicle
 */
export class Tesla implements Vehicle {
    readonly brand = 'Tesla';
    
    constructor(readonly model: string) {}

    getInfo(): string {
        return `${this.brand} ${this.model} - Carga eléctrica al 100%`;
    }

    prepare(): void {
        console.log(`[${this.brand}] Verificando batería...`);
        console.log(`[${this.brand}] Sistema de conducción autónoma listo.`);
    }
}

/**
 * Audi - Implementa el contrato de Vehicle
 */
export class Audi implements Vehicle {
    readonly brand = 'Audi';
    
    constructor(readonly model: string) {}

    getInfo(): string {
        return `${this.brand} ${this.model} - Tracción Quattro activada`;
    }

    prepare(): void {
        console.log(`[${this.brand}] Activando AWD...`);
        console.log(`[${this.brand}] Sistema de suspensión adaptativa listo.`);
    }
}

/**
 * Toyota - Implementa el contrato de Vehicle
 */
export class Toyota implements Vehicle {
    readonly brand = 'Toyota';
    
    constructor(readonly model: string) {}

    getInfo(): string {
        return `${this.brand} ${this.model} - Motor híbrido listo`;
    }

    prepare(): void {
        console.log(`[${this.brand}] Activando modo híbrido...`);
        console.log(`[${this.brand}] Recuperación de energía activa.`);
    }
}

/**
 * Honda - Implementa el contrato de Vehicle
 */
export class Honda implements Vehicle {
    readonly brand = 'Honda';
    
    constructor(readonly model: string) {}

    getInfo(): string {
        return `${this.brand} ${this.model} - VTEC activado`;
    }

    prepare(): void {
        console.log(`[${this.brand}] Activando sistema VTEC...`);
        console.log(`[${this.brand}] Motor optimizado para rendimiento.`);
    }
}

/**
 * Ford - Implementa el contrato de Vehicle
 */
export class Ford implements Vehicle {
    readonly brand = 'Ford';
    
    constructor(readonly model: string) {}

    getInfo(): string {
        return `${this.brand} ${this.model} - Built Tough`;
    }

    prepare(): void {
        console.log(`[${this.brand}] Verificando tracción 4x4...`);
        console.log(`[${this.brand}] Sistema de carga listo.`);
    }
}

/**
 * VehicleManager - Gestión uniforme de vehículos
 * 
 * AHORA: VehicleManager trata todos los vehículos de manera uniforme.
 * No necesita conocer el tipo específico de cada vehículo.
 * Cualquier nuevo vehículo que implemente Vehicle funcionará automáticamente.
 */
export class VehicleManager {

    /**
     * Mostrar detalles de una flota de vehículos
     * Respeta LSP: Trata todos los vehículos como Vehicle, sin type checks
     */
    static printVehicleDetails(vehicles: Vehicle[]): void {
        console.log('\n=== DETALLES DE LA FLOTA ===');
        vehicles.forEach((vehicle, index) => {
            console.log(`${index + 1}. ${vehicle.getInfo()}`);
        });
    }

    /**
     * Preparar todos los vehículos para un viaje
     * Cada vehículo se prepara a su manera (implementación específica)
     * pero todos respetan el mismo contrato
     */
    static prepareFleet(vehicles: Vehicle[]): void {
        console.log('\n=== PREPARANDO FLOTA ===');
        vehicles.forEach((vehicle) => {
            console.log(`\nPreparando ${vehicle.brand} ${vehicle.model}...`);
            vehicle.prepare();
        });
    }
}
