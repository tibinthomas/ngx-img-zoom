import { Injectable } from '@angular/core';
import { NgxImgZoomMode } from './mode.enum';

@Injectable()
export class NgxImgZoomService {
  zoomMode = NgxImgZoomMode.HoverZoom;

  constructor() { }

  setZoomMode(zoomMode) {
    this.zoomMode = zoomMode;
  }
}
