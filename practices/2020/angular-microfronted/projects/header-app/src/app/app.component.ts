import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  //I'm not using a selector because the Custom Element gets one assigned when it is registered. This way, I'm preventing naming conflicts.
  //selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  @Input() title: string = 'default Header App';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((data) => {
      console.log('Request from headerApp');
      console.log(data);
    });
  };


}
