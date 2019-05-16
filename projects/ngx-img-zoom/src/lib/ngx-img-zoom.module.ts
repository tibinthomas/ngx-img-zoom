import { NgModule } from '@angular/core';
import { NgxImgZoomComponent } from './ngx-img-zoom.component';
import { CommonModule } from '@angular/common';
import { NgxImgZoomService } from './ngx-img-zoom.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NgxImgZoomService],
  declarations: [NgxImgZoomComponent],
  exports: [NgxImgZoomComponent]
})
export class NgxImgZoomModule { }
