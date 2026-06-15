/**
 * Responsabilidad: Envío de notificaciones a clientes
 * Abstrae los detalles de cómo se envían las notificaciones
 */

/**
 * Interfaz que define cómo debería comportarse un servicio de notificaciones
 * Permite múltiples implementaciones: Email, SMS, Push, etc.
 */
export interface INotificationService {
    notify(email: string, message: string): void;
}

/**
 * Implementación de notificaciones por correo electrónico
 * Responsabilidad única: enviar emails
 */
export class EmailNotificationService implements INotificationService {
    notify(email: string, message: string): void {
        console.log(`[EmailService] Enviando email a ${email}`);
        console.log(`[EmailService] Contenido: ${message}`);
        // Aquí iría la lógica real de envío de emails
    }
}

/**
 * Implementación de notificaciones por SMS
 * Responsabilidad única: enviar SMS
 */
export class SMSNotificationService implements INotificationService {
    notify(email: string, message: string): void {
        console.log(`[SMSService] Enviando SMS a ${email}`);
        console.log(`[SMSService] Contenido: ${message}`);
        // Aquí iría la lógica real de envío de SMS
    }
}

/**
 * Implementación de notificaciones por notificaciones push
 * Responsabilidad única: enviar notificaciones push
 */
export class PushNotificationService implements INotificationService {
    notify(email: string, message: string): void {
        console.log(`[PushService] Enviando notificación push a ${email}`);
        console.log(`[PushService] Contenido: ${message}`);
        // Aquí iría la lógica real de envío de push notifications
    }
}
