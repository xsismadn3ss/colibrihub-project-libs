import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';

/**
 * @file validation-guard.ts
 * @description Implementa un guard de Angular para validar la autenticación del usuario.
 * Este guard utiliza `ValidationService` para verificar si el usuario está autenticado.
 *
 * ## Configuración
 * Para que el guard funcione correctamente, debes proveer el token `AUTH_SERVICE_URL` en la configuración de tu aplicación.
 * Este token le indica al `ValidationService` a qué URL debe apuntar para validar la sesión del usuario.
 *
 * ### Ejemplo de configuración en `app.config.ts` para un proyecto standalone:
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { AUTH_SERVICE_URL } from 'colibrihub-shared-services';
 *
 * import { routes } from './app.routes';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     { provide: AUTH_SERVICE_URL, useValue: 'https://tu-servicio-de-autenticacion.com' }
 *   ]
 * };
 * ```
 *
 * ## Uso en Rutas
 *
 * Puedes usar `validationGuard` para proteger rutas individuales en tu archivo de rutas (`app.routes.ts`).
 *
 * ### Ejemplo de uso en `app.routes.ts`
 *
 * ```typescript
 * import { Routes } from '@angular/router';
 * import { validationGuard } from 'colibrihub-shared-components';
 * import { DashboardComponent } from './dashboard/dashboard.component';
 *
 * export const routes: Routes = [
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     canActivate: [validationGuard] // Protege la ruta del dashboard
 *   },
 *   // ...otras rutas
 * ];
 * ```
 */
export const validationGuard: CanActivateFn = () => {
  const validationService = inject(ValidationService)
  return validationService.validate().pipe(
    map(()=> true),
    catchError(()=> of(false))
  )
};
