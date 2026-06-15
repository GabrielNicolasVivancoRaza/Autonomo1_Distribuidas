/**
 * REFACTORIZADO - PRINCIPIO DE SEGREGACIÓN DE INTERFAZ (ISP)
 * 
 * En lugar de una interfaz "gorda" (Bird) que obliga a implementar métodos
 * que no todas las aves necesitan, creamos interfaces pequeñas y específicas.
 * 
 * ISP: Los clientes no deben estar forzados a depender de interfaces que no usan.
 */

/**
 * Interfaz específica: Animal que come
 * Cualquier criatura que se alimenta puede implementarla
 */
export interface Eater {
    eat(): void;
}

/**
 * Interfaz específica: Animal que vuela
 * Solo los animales que pueden volar la implementan
 */
export interface Flyer {
    fly(): void;
}

/**
 * Interfaz específica: Animal que nada
 * Solo los animales que pueden nadar la implementan
 */
export interface Swimmer {
    swim(): void;
}

/**
 * Toucan - Implementa lo que REALMENTE necesita
 * Come, vuela, pero nada opcionalmente
 */
export class Toucan implements Eater, Flyer, Swimmer {
    eat(): void {
        console.log('El Tucán está comiendo frutas.');
    }

    fly(): void {
        console.log('El Tucán vuela sobre la selva con sus alas fuertes.');
    }

    swim(): void {
        console.log('El Tucán puede nadar si es necesario en aguas superficiales.');
    }
}

/**
 * Hummingbird - Implementa solo lo que necesita
 * Come y vuela, pero NUNCA nada. No está obligado a implementar Swimmer.
 */
export class Hummingbird implements Eater, Flyer {
    eat(): void {
        console.log('El Colibrí busca néctar en las flores.');
    }

    fly(): void {
        console.log('El Colibrí aletea rápidamente (80 aleteos por segundo).');
    }
}

/**
 * Ostrich - Implementa solo lo que necesita
 * Come y nada, pero NO VUELA. No está obligado a implementar Flyer.
 * Esta es la clave: no hay error de "Las avestruces NO vuelan".
 */
export class Ostrich implements Eater, Swimmer {
    eat(): void {
        console.log('El Avestruz come hierbas, semillas y frutas.');
    }

    swim(): void {
        console.log('El Avestruz puede nadar en aguas tranquilas.');
    }
}

/**
 * Penguin - Implementa solo lo que necesita
 * Come y nada, pero NO VUELA. Un ejemplo perfecto de ISP.
 */
export class Penguin implements Eater, Swimmer {
    eat(): void {
        console.log('El Pingüino come peces y krill.');
    }

    swim(): void {
        console.log('El Pingüino nada con elegancia bajo el agua.');
    }
}

/**
 * Catálogo de fauna - Gestión uniforme respetando ISP
 */
export class BirdCatalog {
    /**
     * Alimentar animales del catálogo
     * Funciona con cualquier Eater, sin importar si vuela o nada
     */
    static feedAnimals(animals: Eater[]): void {
        console.log('\n=== ALIMENTANDO ANIMALES ===');
        animals.forEach((animal) => {
            animal.eat();
        });
    }

    /**
     * Hacer volar animales
     * Funciona SOLO con Flyer. No intentamos volar a animales que no vuelan.
     */
    static makeAnimalsFlу(animals: Flyer[]): void {
        console.log('\n=== ANIMALES EN VUELO ===');
        animals.forEach((animal) => {
            animal.fly();
        });
    }

    /**
     * Hacer nadar animales
     * Funciona SOLO con Swimmer. No intentamos nadar a animales que no nadan.
     */
    static makeAnimalsSwim(animals: Swimmer[]): void {
        console.log('\n=== ANIMALES NADANDO ===');
        animals.forEach((animal) => {
            animal.swim();
        });
    }
}
