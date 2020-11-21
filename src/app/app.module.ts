import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NUMERIC_INPUT_LOCALE, NumericInputModule } from 'projects/numeric-input/src/public-api';
// import { NumericInputModule } from '@ng-dl/numeric-input';

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
