import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NumericInputModule, NUMERIC_INPUT_LOCALE } from '@ng-dl/numeric-input';
import { DelayedDragoverModule } from '@ng-dl/delayed-dragover';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NumericInputModule, DelayedDragoverModule],
  providers: [{provide: NUMERIC_INPUT_LOCALE, useValue: ['en-us']}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
