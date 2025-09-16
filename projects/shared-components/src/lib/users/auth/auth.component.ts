import {Component, inject, OnInit, signal} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';

/**
 * @component Auth
 * @description
 * Este componente gestiona la visibilidad del contenido basándose en el estado de
 * la sesión del usuario. Muestra un contenido si el usuario está autenticado y otro
 * si no lo está.
 *
 * ## Uso
 *
 * El componente `Auth` utiliza proyección de contenido con selectores de atributos para mostrar
 * diferentes plantillas dependiendo del estado de la autenticación.
 *
 * - `[valid]`: El contenido con este selector se mostrará si la sesión del usuario es válida.
 * - `[invalid]`: El contenido con este selector se mostrará si la sesión del usuario no es válida.
 *
 * ```html
 * <!-- app.component.html -->
 * <h1>Mi Aplicación</h1>
 * <auth>
 *   <div valid>
 *     <h2>Bienvenido, usuario!</h2>
 *     <p>Este es tu dashboard.</p>
 *   </div>
 *   <div invalid>
 *     <h2>Acceso Denegado</h2>
 *     <p>Por favor, inicia sesión para continuar.</p>
 *   </div>
 * </auth>
 * ```
 *
 * ## Configuración
 *
 * `Auth` depende de `ValidationService`, que a su vez requiere el token `AUTH_SERVICE_URL`.
 * Debes proveer este token en la configuración de tu aplicación (`app.config.ts`).
 *
 * ### Ejemplo de configuración en `app.config.ts`
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { AUTH_SERVICE_URL } from 'colibrihub-shared-services';
 * import { routes } from './app.routes';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     // Provee la URL del servicio de autenticación
 *     { provide: AUTH_SERVICE_URL, useValue: 'https://api.tu-dominio.com/auth' }
 *   ]
 * };
 * ```
 */
@Component({
  selector: 'auth',
  standalone: true,
  imports: [],
  template: `
    @if (isLoaded()){
      @if (isValid()){
        <ng-content select="[valid]"></ng-content>
      } @else {
        <ng-content select="[invalid]"></ng-content>
      }
    }
  `
})
export class Auth implements OnInit{
  protected isValid = signal<boolean>(false);
  protected isLoaded = signal<boolean>(false);
  private readonly validationService = inject(ValidationService)

  ngOnInit() {
    this.validationService.validate().subscribe({
      next: () => {
        this.isValid.set(true);
        this.isLoaded.set(true);
      },
      error: () => {
        this.isValid.set(false);
        this.isLoaded.set(true);
      }
    });
  }
}
