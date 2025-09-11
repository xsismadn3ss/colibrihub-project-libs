import {InjectionToken} from '@angular/core';

/**
 * URL del microservicio de autenticación
 * <br>
 * Es utilizada por ``AuthService`` y ``ValidationService``
 */
export const AUTH_SERVICE_URL = new InjectionToken<string>('AUTH_AUTH_URL');

