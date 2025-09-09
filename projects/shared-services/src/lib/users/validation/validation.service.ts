import {inject, Injectable, isDevMode} from '@angular/core';
import {AUTH_SERVICE_URL} from '../../config/config';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {findCookie} from '../../utils/cookie';
import {Observable, throwError} from 'rxjs';
import {UserDto} from 'colibrihub-shared-dtos';

/**
 * ## ``ValidationService``
 * Utiliza este servicio para validar la sesión del usuario
 * y agregar una capa de seguridad en tu módulo.
 *
 * > **Nota**: Configura el token ``AUTH_SERVICE_URL`` para poder
 * user el servicio sin problemas.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private readonly prefix = '/validation';
  private readonly baseUrl = inject(AUTH_SERVICE_URL);
  private httpClient = inject(HttpClient);

  private getUrl(path: string){
    return `${this.baseUrl}${this.prefix}/${path}`
  }

  validate(): Observable<UserDto>{
    if(isDevMode()){
      const cookie = findCookie('token')?.replace(/^token=/, '');
      if(!cookie){
        return throwError(() => new HttpResponse({
          status: 401,
          statusText: 'Unauthorized',
          body: { message: 'Token not  found in cookie'},
          url: this.getUrl('header')
        }))
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${cookie}`
      })

      return this.httpClient.get<UserDto>(this.getUrl('header'), {headers})
    }

    return this.httpClient.get<UserDto>(this.getUrl('cookie'), {withCredentials: true})
  }
}
