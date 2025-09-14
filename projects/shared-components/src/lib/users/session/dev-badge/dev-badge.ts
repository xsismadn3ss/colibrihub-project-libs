import {Component, inject, OnInit} from '@angular/core';
import {DevContainer} from '../../../common/dev/dev';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, ValidationService} from 'colibrihub-shared-services';
import {LoginDto} from 'colibrihub-shared-dtos';

/**
 * @component DevBadge
 * @description
 * Este componente proporciona una insignia de desarrollo que solo es visible en modo de desarrollo.
 * Permite a los desarrolladores iniciar y cerrar sesión, y muestra el estado de validación de la sesión actual.
 *
 * Está diseñado para ser utilizado dentro del componente `DevContainer` para garantizar que solo se renderice en entornos de desarrollo.
 *
 * @usageNotes
 *
 * ### Configuración de los Injection Tokens
 *
 * Este componente, a través de los servicios que inyecta (`AuthService` y `ValidationService`),
 * depende de un `InjectionToken` para configurar la URL del servicio de autenticación.
 *
 * Debes proporcionar el valor para `AUTH_SERVICE_URL` en los providers de tu aplicación,
 * típicamente en `app.config.ts` (para aplicaciones standalone) o en `app.module.ts`.
 *
 * #### Ejemplo de configuración en `app.config.ts`:
 *
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideHttpClient } from '@angular/common/http';
 * import { AUTH_SERVICE_URL } from 'colibrihub-shared-services'; // Asegúrate de importar el token
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(),
 *     { provide: AUTH_SERVICE_URL, useValue: 'http://localhost:3000/api/auth' } // Proporciona la URL de tu backend
 *   ]
 * };
 * ```
 *
 * ### Ejemplo de uso en una plantilla:
 *
 * ```html
 * <div>
 *   <dev-badge></dev-badge>
 * </dev>
 * ```
 */
@Component({
  selector: 'dev-badge',
  imports: [DevContainer, ReactiveFormsModule],
  templateUrl: './dev-badge.html',
  styleUrl: './dev-badge.css'
})
export class DevBadge implements OnInit {
  /**
   * @property {AuthService} authService
   * @description Servicio inyectado para gestionar la autenticación de usuarios (login/logout).
   * @protected
   */
  protected readonly authService = inject(AuthService);

  /**
   * @property {ValidationService} validationService
   * @description Servicio inyectado para validar la sesión del usuario.
   * @protected
   */
  protected readonly validationService = inject(ValidationService);

  /**
   * @property {boolean} hide
   * @description Controla la visibilidad del formulario de inicio de sesión.
   * @protected
   */
  protected hide = true;

  /**
   * @property {boolean} isValid
   * @description Indica si la sesión del usuario actual es válida.
   * @protected
   */
  protected isValid = false;

  /**
   * @property {FormGroup} loginForm
   * @description FormGroup para el formulario de inicio de sesión, con controles para `username` y `password`.
   * @protected
   */
  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * @method toggle
   * @description Cambia el estado de la propiedad `hide` para mostrar u ocultar el formulario de inicio de sesión.
   * @protected
   * @returns {void}
   */
  protected toggle(){
    this.hide = !this.hide;
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Llama a `validationService.validate()` para comprobar el estado de la sesión.
   * @returns {void}
   */
  ngOnInit() {
    this.validationService.validate().subscribe({
      next: () => {
        this.isValid = true;
      },
      error: () => {
        this.isValid = false;
      }
    });
  }

  /**
   * @method login
   * @description Intenta autenticar al usuario utilizando las credenciales del `loginForm`.
   * Si el formulario es válido, llama a `authService.login()`.
   * Recarga la página en caso de éxito o muestra una alerta en caso de error.
   * @protected
   * @returns {void}
   */
  protected login(){
    if(this.loginForm.valid){
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      } as LoginDto;
      this.authService.login(data).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: () => {
          window.alert("Usuario o contraseña incorrectos");
        }
      });
    }else{
      window.alert("El formulario no es valido");
    }
  }

  /**
   * @method logout
   * @description Cierra la sesión del usuario llamando a `authService.logout()`.
   * Recarga la página tras cerrar la sesión.
   * @protected
   * @returns {void}
   */
  protected logout(){
    this.authService.logout().subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
