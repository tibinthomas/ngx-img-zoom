import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Lib imports
import { NgxImgZoomModule } from 'ngx-img-zoom';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxImgZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
