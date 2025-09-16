import {Component, inject, OnInit} from '@angular/core';
import {DevContainer} from '../../../common/dev/dev';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, ValidationService } from 'colibrihub-shared-services';
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
  protected readonly authService = inject(AuthService);
  protected readonly validationService = inject(ValidationService);

  protected hide = true;
  protected isValid = false;

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  protected toggle(){
    this.hide = !this.hide;
  }

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
