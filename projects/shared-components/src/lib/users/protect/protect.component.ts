import {Component, inject, OnInit} from '@angular/core';
import {ValidationService, AUTH_LOGIN_URL} from 'colibrihub-shared-services';

@Component({
  selector: 'protect',
  imports: [],
  template: `
    @if (isLoaded) {
      @if (isValid) {
        <ng-content></ng-content>
      }
    }
  `
})
export class Protect implements OnInit{
  protected isLoaded = false;
  protected isValid = false;
  private readonly loginUrl = inject(AUTH_LOGIN_URL)
  private readonly validationService = inject(ValidationService)

  ngOnInit() {
    try{
      this.validationService.validate().subscribe(()=>{
        this.isValid = true;
        this.isLoaded = true;
      })
    } catch(e){
      this.isLoaded = true;
      this.isValid = false;
      window.location.href = `${this.loginUrl}?redirect=${window.location.host}`
    }
  }
}
