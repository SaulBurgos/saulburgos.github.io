import { Component, Input, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  //I'm not using a selector because the Custom Element gets one assigned when it is registered. This way, I'm preventing naming conflicts.
  //selector: 'app-root'
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @Input() title: string = 'default text';
  @Input() message: string = 'default message';

  constructor(private ref: ChangeDetectorRef) {

  }

  // detectChanges() {
  //   this.ref.detectChanges();
  // }

}
