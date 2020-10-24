import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  //I'm not using a selector because the Custom Element gets one assigned when it is registered. This way, I'm preventing naming conflicts.
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  @Input() articles: Array<any> = [
    'introduction',
    'How to',
    'intermediate',
    'Advance'
  ];
}
