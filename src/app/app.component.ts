import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previewImageSrc = 'http://lorempixel.com/g/1920/1920/';
  zoomImageSrc = this.previewImageSrc;
  date = new Date().getFullYear();
  _formData: any = {};
  

  set formData(val) {
    this._formData = val;
    this.previewImageSrc = this.zoomImageSrc = val.url;
  };
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
    
    this.previewImageSrc = `http://lorempixel.com/g/1920/1920/?${Math.random()}`;
    this.zoomImageSrc = this.previewImageSrc;
  

  }

  email = new FormControl('', [Validators.required, Validators.email]);


}
