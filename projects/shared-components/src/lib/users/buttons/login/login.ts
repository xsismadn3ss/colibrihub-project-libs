import {Component, inject} from '@angular/core';
import {LOGIN_URL} from '../../../config/config';

/**
 * @description
 * Botón que redirige a la página de inicio de sesión
 *
 * @usageNotes
 * 1. Importa el componente donde lo necesites
 *
 * ```typescript
 * import { LoginButton } from 'shared-components';
 *
 * @Component({
 *   selector: 'my-component',
 *   imports: [LoginButton]
 * })
 * export class MyComponent {}
 * ```
 *
 * 2. Añade el selector en el template
 *
 * ```html
 * <login-button></login-button>
 * ```
 *
 * 3. Configura el token `LOGIN_URL` en tu `app.config.ts`
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideRouter } from '@angular/router';
 * import { LOGIN_URL } from 'colibrihub-shared-components';
 *
 * import { routes } from './app.routes';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     { provide: LOGIN_URL, useValue: 'https://your-login-url.com' }
 *   ]
 * };
 * ```
 */
@Component({
  selector: 'login-button',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginButton {
  private readonly loginUrl = inject(LOGIN_URL);

  protected redirect(){
    window.location.href = `${this.loginUrl}?redirect=${window.location.host}`
  }
}
