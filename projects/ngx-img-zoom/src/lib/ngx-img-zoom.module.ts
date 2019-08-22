import { NgModule } from '@angular/core';
import { NgxImgZoomComponent } from './ngx-img-zoom.component';
import { CommonModule } from '@angular/common';
import { NgxImgZoomService } from './ngx-img-zoom.service';
import { MouseWheelDirective } from './mouse-wheel.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NgxImgZoomService],
  declarations: [NgxImgZoomComponent, MouseWheelDirective],
  exports: [NgxImgZoomComponent]
})
export class NgxImgZoomModule { }
