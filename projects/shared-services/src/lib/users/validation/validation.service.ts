import {inject, Injectable, isDevMode} from '@angular/core';
import {AUTH_SERVICE_URL} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {findCookie} from '../../utils/cookie';

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

  validate(){
    if(isDevMode()){
      const cookie = findCookie('token')?.replace(/^token=/, '');
      if(!cookie){
        throw new Error('Token not found in cookie')
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${cookie}`
      })

      return this.httpClient.get(this.getUrl('header'), {headers})
    }

    return this.httpClient.get(this.getUrl('cookie'), {withCredentials: true})
  }
}
