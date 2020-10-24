import { Component, Input,ViewEncapsulation } from '@angular/core';

@Component({
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  @Input() menu: Array<any> = ['home','about','princing','login'];
}
