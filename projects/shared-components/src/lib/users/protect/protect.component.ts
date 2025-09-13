import {Component, inject, isDevMode, OnInit} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {LOGIN_URL} from '../../config/config';

/**
 * @component Protect
 * @description
 * Este componente protege el contenido que envuelve, mostrándolo solo si el usuario
 * tiene una sesión válida. Si la sesión no es válida, redirige al usuario a la URL
 * de inicio de sesión especificada.
 *
 * > Si el proyecto aún no está en producción hace una redirección a la ruta ``/``
 *
 * ## Uso
 *
 * Para utilizar este componente, envuelve el contenido que deseas proteger con la etiqueta `<protect>`.
 *
 * ```html
 * <!-- app.component.html -->
 * <h1>Mi Aplicación</h1>
 * <protect>
 *   <h2>Área Protegida</h2>
 *   <p>Este contenido solo es visible para usuarios autenticados.</p>
 * </protect>
 * ```
 *
 * ## Configuración
 *
 * `Protect` depende de dos tokens de inyección que deben ser provistos en la configuración
 * de tu aplicación (`app.config.ts`): `AUTH_SERVICE_URL` y `LOGIN_URL`.
 *
 * - `AUTH_SERVICE_URL`: La URL base del servicio de autenticación que se usará para validar la sesión del usuario.
 * - `AUTH_LOGIN_URL`: La URL a la que se redirigirá al usuario si la validación de la sesión falla.
 *
 * ### Ejemplo de configuración en `app.config.ts`
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { AUTH_SERVICE_URL } from 'colibrihub-shared-services';
 * import { LOGIN_URL } from 'colibrihub-shared-components';
 * import { routes } from './app.routes';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     // Provee la URL del servicio de autenticación
 *     { provide: AUTH_SERVICE_URL, useValue: 'https://api.tu-dominio.com/auth' },
 *     // Provee la URL para el inicio de sesión
 *     { provide: LOGIN_URL, useValue: 'https://login.tu-dominio.com' }
 *   ]
 * };
 * ```
 */
@Component({
  selector: 'protect',
  standalone: true,
  imports: [],
  template: `
    @if (isLoaded) {
      @if (isValid) {
        <ng-content></ng-content>
      }
    }
  `
})
export class Protect implements OnInit{
  protected isLoaded = false;
  protected isValid = false;
  private readonly loginUrl = inject(LOGIN_URL)
  private readonly validationService = inject(ValidationService)

  ngOnInit() {
    if(isDevMode()){
      window.location.href = '/';
    }
    this.validationService.validate().subscribe({
      next: ()=>{
        this.isValid = true;
        this.isLoaded = true;
      },
      error: ()=>{
        this.isLoaded = true;
        this.isValid = false;
        window.location.href = `${this.loginUrl}?redirect=${window.location.host}`
      }
    });
  }
}
