import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';




import { AppComponent } from './app.component';

// Lib imports
import { NgxImgZoomModule } from 'ngx-img-zoom';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxImgZoomModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
