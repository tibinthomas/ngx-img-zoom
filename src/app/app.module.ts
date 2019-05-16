import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';




import { AppComponent } from './app.component';

// Lib imports
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { FormComponent } from './form/form.component';
import { TryityourselfComponent } from './tryityourself/tryityourself.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TryityourselfComponent
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
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
