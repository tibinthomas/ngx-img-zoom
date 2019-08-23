import { Injectable } from '@angular/core';
import { NgxImgZoomMode } from './mode.enum';

@Injectable()
export class NgxImgZoomService {
  zoomMode = NgxImgZoomMode.HoverZoom;
  zoomBreakPoints;
  constructor() { }

  // setZoomMode(zoomMode) {
  //   this.zoomMode = zoomMode;
  // }

  setZoomBreakPoints(breakPoints) {
    this.zoomBreakPoints = breakPoints;
  }
}
