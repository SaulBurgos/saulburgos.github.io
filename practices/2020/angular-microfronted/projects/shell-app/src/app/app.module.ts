import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LazyElementsModule } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LazyElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //As the browser renders it, Angular is not aware of the element name of custom element.
  //To prevent it from throwing an error, we have to use the CUSTOM_ELEMENTS_SCHEMA
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

  constructor(private ngZone: NgZone) {
    (window as any).ngZone = this.ngZone // store ngZone reference on the window object
  }

}
