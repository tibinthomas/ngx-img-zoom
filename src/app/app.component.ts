import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previewImageSrc = './assets/zoom0.png';
  zoomImageSrc = './assets/zoom0.png';

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
}
