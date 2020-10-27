import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'Title from Shell';

  bodyApp: any = {
    title: 'Shell is loading',
    message: 'Wooow is working'
  };

  articles: Array<any> = [
    'Shell 1',
    'Shell 2',
    'Shell 3',
    'Shell 4',
  ];

  menu: Array<any> = [
    'shell menu 1',
    'shell menu 2',
    'shell menu 3',
    'shell menu 4'
  ];

  components = {
    headerUrl: 'http://localhost:8080/headerApp/main.js',
    bodyUrl: 'http://localhost:8080/bodyApp/main.js',
    sidebarUrl: 'http://localhost:8080/sidebarApp/main.js',
    footerUrl: 'http://localhost:8080/footerApp/main.js'
  };

  constructor() {

  }

  ngOnInit() {
    //const headerScript = document.createElement('script');
    //headerScript.src = 'components/headerApp/main.js';
    // headerScript.src = 'http://localhost:8080/headerApp/main.js';
    // document.body.appendChild(headerScript);

    // const bodyScript = document.createElement('script');
    // bodyScript.src = 'http://localhost:8080/bodyApp/main.js';
    // document.body.appendChild(bodyScript);

    //const sidebarScript: any = document.createElement('script');
    //sidebarScript.src = 'components/sidebarApp/main.js';
    // sidebarScript.src = 'http://localhost:8080/sidebarApp/main.js';
    // document.body.appendChild(sidebarScript);

    //const footerScript = document.createElement('script');
    //footerScript.src = 'components/footerApp/main.js';
    // footerScript.src = 'http://localhost:8080/footerApp/main.js';
    // document.body.appendChild(footerScript);


    /****listen events */
    // const sidebar = document.getElementById('sidebar');
    // // register a event handler named 'highlight'
    // sidebar.addEventListener('sidebarEvents', function(event) {
    //   console.log(event);
    // });

  }

  onSidebarEvents(event) {
    console.log(event);
  }

  triggerEventOnSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.dispatchEvent(new CustomEvent('sidebarActions', {
      bubbles: false,
      detail: {
        actionName: 'sayHello',
        payload: {
          foo: 'bar'
        }
      }
    }));
  }

  ngAfterViewInit() {
  }
}
