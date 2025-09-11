import {InjectionToken} from '@angular/core';

/**
 * Token de inyección que corresponde a la URL para cerrar sesión
 */
export const LOGOUT_URL = new InjectionToken<string>('LOGOUT_URL');

/**
 * Token de inyección para la URL de la página de inicio de sesión
 */
export const LOGIN_URL = new InjectionToken<string>('LOGIN_URL');
