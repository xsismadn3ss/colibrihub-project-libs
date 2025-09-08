import {Component, inject, OnInit} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {AUTH_LOGIN_URL} from 'shared-services';

@Component({
  selector: 'lib-protect',
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
      this.validationService.validate().subscribe(data=>{
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
