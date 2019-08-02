import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, Input, HostListener } from '@angular/core';
import { NgxImgZoomService } from './ngx-img-zoom.service';
import { NgxImgZoomMode } from './mode.enum';
@Component({
  selector: 'ngx-img-zoom',
  templateUrl: './ngx-img-zoom.component.html',
  styleUrls: ['./ngx-img-zoom.component.css'],
})
export class NgxImgZoomComponent implements OnInit, AfterViewInit {

  img; lens; result; cx; cy; container;
  hide = true;
  _triggerAnimationIn = false;
  notFirstTime = false;
  showResult = false;
  constructor(
    private renderer: Renderer2,
    private ngxZoomService: NgxImgZoomService
    ) { }

    zoomMode: NgxImgZoomMode = this.ngxZoomService.zoomMode;
    @ViewChild('img') imgElmRef: ElementRef;
    @ViewChild('result') resultElmRef: ElementRef;
    @ViewChild('container') containerElmRef: ElementRef;


    _imgStyle;
    @Input() set imgStyle(val) {
      this._imgStyle = val;
    }
    get imgStyle() {
      return this._imgStyle;
    }

    _resultStyle;
    @Input() set resultStyle(val) {
      this._resultStyle = val;
    }
    get resultStyle() {
      return this._resultStyle;
    }

    _lensStyle;
    @Input() set lensStyle(val) {
      this._lensStyle = val;
    }
    get lensStyle() {
      return this._lensStyle;
    }
    @Input() containerStyle;
    zoomImage;
    previewImage;

  @HostListener('window:scroll', ['$event']) onscroll(event) {
    this.hide = true;
    this.renderer.setStyle(this.lens, 'visibility', 'hidden');
  }
  @HostListener('window:click', ['$event.target']) onclick(event) {
    this.hide = true;
    this.renderer.setStyle(this.lens, 'visibility', 'hidden');
  }

  @Input('zoomImageSrc') set _imgSrc(val) {
    this.zoomImage = val;
    if (this.notFirstTime === true) {
      this.renderer.setStyle(this.result, 'backgroundImage', "url('" + val + "')");
    }
    this.notFirstTime = true;
    // this.renderer.setStyle(this.result, 'backgroundImage', val);
  }

  @Input('previewImageSrc') set _zoomImage(val) {
    this.previewImage = val;
    this.showResult = false;
    const image = new Image();
    image.src = this.zoomImage;
    image.onload = () => {
      this.showResult = true;
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.img = this.imgElmRef.nativeElement;
    this.result = this.resultElmRef.nativeElement;
    this.container = this.containerElmRef.nativeElement;

    this.renderer.setAttribute(this.img, 'style', <string>this.imgStyle);
    this.renderer.setAttribute(this.result, 'style', <string>this.resultStyle);
    this.renderer.setAttribute(this.container, 'style', <string>this.containerStyle);
    this.imageZoom();
    this.renderer.setStyle(this.lens, 'visibility', 'hidden');
    this.renderer.listen(this.img, 'mouseout', () => {
      this.hide = true;
      this.renderer.setStyle(this.lens, 'visibility', 'hidden');
     });
  }


  imageZoom() {
    /*create lens:*/
    this.lens = this.renderer.createElement('DIV');
    this.renderer.addClass(this.lens, 'img-zoom-lens');
    this.renderer.setAttribute(this.lens, 'style', <string>this.lensStyle);

    /*insert lens:*/
    this.renderer.insertBefore(this.img.parentElement, this.lens, this.img);

    /*calculate the ratio between result DIV and lens:*/
    this.cx = this.result.offsetWidth / this.lens.offsetWidth;
    this.cy = this.result.offsetHeight / this.lens.offsetHeight;

    /*set background properties for the result DIV:*/
    this.renderer.setStyle(this.result, 'backgroundImage', "url('" + this.zoomImage + "')");
    this.renderer.setStyle(this.result, 'backgroundSize', (this.img.width * this.cx) + 'px ' + (this.img.height * this.cy) + 'px');
    // this.renderer.setStyle(this.img.parentElement, 'position', 'relative')

    /*execute a function when someone moves the cursor over the image, or the lens:*/
    this.renderer.listen(this.lens, 'mousemove', this.moveLens.bind(this));
    this.renderer.listen(this.img, 'mousemove', this.moveLens.bind(this));

    /*and also for touch screens:*/
    this.renderer.listen(this.img, 'touchmove', this.moveLens.bind(this));
    this.renderer.listen(this.lens, 'touchmove', this.moveLens.bind(this));
  }

  moveLens(e) {
      let pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = this.getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (this.lens.offsetWidth / 2);
      y = pos.y - (this.lens.offsetHeight / 2);


      /*prevent the lens from being positioned outside the image:*/
      if (x > this.img.width - this.lens.offsetWidth) {
        x = this.img.width - this.lens.offsetWidth;

        this.hide = true;
        this.renderer.setStyle(this.lens, 'visibility', 'hidden');
      } else {
        this.hide = false;
        if (this.showResult) {
          this.renderer.setStyle(this.lens, 'visibility', 'visible');
        }
      }

      if (x < 0) {
        x = 0;
        this.hide = true;
        this.renderer.setStyle(this.lens, 'visibility', 'hidden');
      }

      if (y > this.img.height - this.lens.offsetHeight) {
        y = this.img.height - this.lens.offsetHeight;
        this.hide = true;
        this.renderer.setStyle(this.lens, 'visibility', 'hidden');
      }

      if (y < 0) {
        y = 0;
        this.hide = true;
        this.renderer.setStyle(this.lens, 'visibility', 'hidden');
      }

      /*set the position of the lens:*/
      this.renderer.setStyle(this.lens, 'left', x + 'px');
      this.renderer.setStyle(this.lens, 'top', y + 'px');
      /*display what the lens 'sees':*/
      this.renderer.setStyle(this.result, 'backgroundPosition', '-' + (x * this.cx) + 'px -' + (y * this.cy) + 'px');
    }

  getCursorPos(e) {
      let a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = this.img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
  }

  handleMouseLeave() {
    this.hide = true;
    this.renderer.setStyle(this.lens, 'visibility', 'hidden');
  }

}
