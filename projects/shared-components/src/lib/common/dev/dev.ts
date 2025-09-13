import {Component, isDevMode, OnInit} from '@angular/core';

@Component({
  selector: 'dev',
  imports: [],
  template: `
    @if (devMode){
      <ng-content select="[dev]"></ng-content>
    } @else{
      <ng-content select="[prod]"></ng-content>
    }
  `,
  styles: ``
})
export class DevContainer implements OnInit{
  protected devMode = true;

  ngOnInit() {
    this.devMode = isDevMode()
  }

}
