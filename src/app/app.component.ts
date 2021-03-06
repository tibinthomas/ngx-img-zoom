import { NgxImgZoomService } from "../../projects/ngx-img-zoom/src/public_api"; 
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private ngxImgZoom: NgxImgZoomService) {
    // this.ngxImgZoom.setZoomMode(NgxImgZoomMode.DoubleClickZoom);
    this.ngxImgZoom.setZoomBreakPoints([{ w: 100, h: 100 }, { w: 150, h: 150 }, { w: 200, h: 200 }, { w: 250, h: 250 }, { w: 300, h: 300 }]);
  }
  previewImageSrc = 'https://picsum.photos/1920/1920/';
  zoomImageSrc = this.previewImageSrc;
  date = new Date().getFullYear();
  _formData: any = {};

  set formData(val) {
    this._formData = val;
    this.previewImageSrc = this.zoomImageSrc = val.url;
  }

  changeImageForZoom() {
    const num1 = Math.floor(Math.random() * 4) + 1;
    if (num1 === 1) {
      this.previewImageSrc = `./assets/zoom${num1}.png`
    } else {
      this.previewImageSrc = `./assets/zoom${num1}.jpg`
    }
    const num2 = Math.floor(Math.random() * 4) + 1;
    if (num2 === 1) {
      this.zoomImageSrc = `./assets/zoom${num2}.png`
    } else {
      this.zoomImageSrc = `./assets/zoom${num2}.jpg`
    }
  }
  handleButton() {
    this.previewImageSrc = `https://picsum.photos/1920/1920?random=${Math.random()}`;
    this.zoomImageSrc = this.previewImageSrc;
  }

}
