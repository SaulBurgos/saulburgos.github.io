import { Component, Input,ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @Input() menu: Array<any> = ['home','about','princing','login'];

  constructor(private ref: ChangeDetectorRef) {

  }

  // detectChanges() {
  //   this.ref.detectChanges();
  // }
}
