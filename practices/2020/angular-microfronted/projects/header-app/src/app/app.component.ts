import { Component, ViewEncapsulation, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  //I'm not using a selector because the Custom Element gets one assigned when it is registered. This way, I'm preventing naming conflicts.
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @Input() title: string = 'default Header App';

  constructor(private http: HttpClient,private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((data) => {
      console.log('Request from headerApp');
      console.log(data);
    });
  };

  // detectChanges() {
  //   this.ref.detectChanges();
  // }

}
