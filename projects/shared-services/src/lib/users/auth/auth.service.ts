import {inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_SERVICE_URL} from '../../config/config';
import {LoginDto, LoginResponseDto, MessageDto} from 'colibrihub-shared-dtos';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly baseUrl = inject(AUTH_SERVICE_URL)
  private readonly prefix = '/authentication'

  getUrl(path: string){
    return `${this.baseUrl}${this.prefix}/${path}`
  }

  login(credentials: LoginDto) :Observable<LoginResponseDto> {
    const res = this.httpClient
      .post<LoginResponseDto>(`${this.getUrl('/login')}`, credentials);

    if(isDevMode()){
      res.subscribe(data => {
        document.cookie = `token=${data.token}; max-age=60*60*24; path=/;`
      });
    }

    return res;
  }

  logout(): Observable<MessageDto>{
    if(isDevMode()){
      document.cookie = `token=; max-age=0; path=/;`
      const res = {message: "Has cerrados sesión con éxito"} as MessageDto
      return new Observable<MessageDto>(subscriber => {
        subscriber.next(res);
        subscriber.complete();
      })
    }

    return this.httpClient.post<MessageDto>(
      `${this.getUrl('/logout')}`,
      {},
      {withCredentials: true}
    )
  }
}
