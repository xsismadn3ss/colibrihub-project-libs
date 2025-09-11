import {Component, inject} from '@angular/core';
import {LOGOUT_URL} from '../../../config/config';

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
