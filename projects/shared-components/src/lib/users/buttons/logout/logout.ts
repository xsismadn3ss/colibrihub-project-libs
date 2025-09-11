import {Component, inject} from '@angular/core';
import {LOGOUT_URL} from '../../../config/config';

/**
 * @description
 * Botón que redirige a la página de cierre de sesión
 *
 * @usageNotes
 * 1. Importa el componente donde lo necesites
 *
 * ```typescript
 * import { LogoutButton } from 'shared-components';
 *
 * @Component({
 *   selector: 'my-component',
 *   imports: [LogoutButton]
 * })
 * export class MyComponent {}
 * ```
 *
 * 2. Añade el selector en el template
 *
 * ```html
 * <logout-button></logout-button>
 * ```
 *
 * 3. Configura el token `LOGOUT_URL` en tu `app.config.ts`
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { LOGOUT_URL } from 'colibrihub-shared-components';
 *
 * import { routes } from './app.routes';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     { provide: LOGOUT_URL, useValue: 'https://your-logout-url.com' }
 *   ]
 * };
 * ```
 */
@Component({
  selector: 'logout-button',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class LogoutButton {
  private readonly logoutUrl = inject(LOGOUT_URL);

  protected redirect(){
    window.location.href = `${this.logoutUrl}?redirect=${window.location.host}`
  }
}
