import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumericInputModule } from 'projects/numeric-input/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NumericInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
