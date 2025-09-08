import {Component, inject, OnInit} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';

@Component({
  selector: 'auth',
  imports: [],
  template: `
    @if (isLoaded){
      @if (isValid){
        <ng-content select="valid"></ng-content>
      }
      <ng-content select="invalid"></ng-content>
    }
  `
})
export class Auth implements OnInit{
  protected isValid = false;
  protected isLoaded = false;
  private readonly validationService = inject(ValidationService)

  ngOnInit() {
    try{
      this.validationService.validate().subscribe(data => {
        this.isValid = true;
        this.isLoaded = true;
      })
    }catch(e){
      this.isLoaded = true;
      this.isValid = false;
    }
  }
}
