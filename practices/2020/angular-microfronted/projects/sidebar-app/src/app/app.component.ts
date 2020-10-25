import { Component, ViewEncapsulation, Input, EventEmitter, Output, HostListener, OnInit, ElementRef} from '@angular/core';

@Component({
  //I'm not using a selector because the Custom Element gets one assigned when it is registered. This way, I'm preventing naming conflicts.
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  @Output() sidebarEvents = new EventEmitter();
  @Input() articles: Array<any> = [
    'introduction',
    'How to',
    'intermediate',
    'Advance'
  ];

  // listen event #1
  // @HostListener('sidebarActions', ['$event'])  onClick(event: any) {
  //   console.log(`Sidebar: Event recieved`);
  //   console.log(event);
  // };

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    // listen event #2, be sure to removeListener on ngdestroy
    this.elementRef.nativeElement.addEventListener('sidebarActions', (event) => {
      console.log(`Sidebar: Event recieved`);
      console.log(event);
    }, false);
  }

  onItemClicked(item) {
    this.sidebarEvents.next({
      name: 'itemClicked',
      payload: item
    })
  };
}
