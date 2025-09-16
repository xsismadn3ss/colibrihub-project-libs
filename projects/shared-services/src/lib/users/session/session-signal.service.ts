import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionSignalService {
  private userSignal = signal<string | null>(null)

  get user(){
    return this.userSignal();
  }

  setUser(user: string){
    this.userSignal.set(user)
  }

  clear(){
    this.userSignal.set(null)
  }
}
