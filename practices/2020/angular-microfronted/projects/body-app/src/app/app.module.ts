import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [],
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
    customElements.define('body-app', externalTileCE);
  }
}
