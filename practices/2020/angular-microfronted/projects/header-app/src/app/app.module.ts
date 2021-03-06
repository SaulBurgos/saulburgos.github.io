import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';

//https://angular-extensions.github.io/elements/#/docs/change-detection
//https://github.com/angular/zone.js/blob/master/NON-STANDARD-APIS.md
import  'zone.js/dist/zone-patch-rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
  //For exposing an Angular Component as a Custom Element, we need to declare it and put it
  //into the entryComponents section of a module. This is necessary because Angular Elements
  //is creating it dynamically at runtime
  entryComponents: [
    AppComponent
  ],
  //As the browser renders it, Angular is not aware of the element name of custom element.
  //To prevent it from throwing an error, we have to use the CUSTOM_ELEMENTS_SCHEMA
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  //Register your Angular Component as a Custom Element
  ngDoBootstrap() {
    const externalTileCE = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('header-app', externalTileCE);
  }
}
