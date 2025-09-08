import {InjectionToken} from '@angular/core';

/**
 * URL para inicio de sesión, es necesaria para indicar
 * a que URL se hará la redirección para iniciar sesión
 * en un módulo externo
 */
export const AUTH_LOGIN_URL = new InjectionToken<string>('AUTH_LOGIN_URL');

/**
 * URL del microservicio de autenticación
 * <br>
 * Es utilizada por ``AuthService`` y ``ValidationService``
 */
export const AUTH_AUTH_URL = new InjectionToken<string>('AUTH_AUTH_URL');

