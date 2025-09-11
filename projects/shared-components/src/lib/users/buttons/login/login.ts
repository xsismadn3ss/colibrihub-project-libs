import {Component, inject} from '@angular/core';
import {LOGIN_URL} from '../../../config/config';

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
