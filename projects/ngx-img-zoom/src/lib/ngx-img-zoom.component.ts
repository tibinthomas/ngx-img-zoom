import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, Input, HostListener, OnDestroy } from '@angular/core';
import { NgxImgZoomService } from './ngx-img-zoom.service';
import { NgxImgZoomMode } from './mode.enum';
@Component({
  selector: 'ngx-img-zoom',
  templateUrl: './ngx-img-zoom.component.html',
  styleUrls: ['./ngx-img-zoom.component.css'],
})
export class NgxImgZoomComponent implements OnInit, AfterViewInit, OnDestroy {

  img; lens; result; cx; cy; container;
  hide = true;
  _triggerAnimationIn = false;
  notFirstTime = false;
  showResult = false;
  lastEventBeforeTheWheel;
  zoomBreakPoints;
  zoomIndex = 0;

  lensMouseMoveListener;
  imgMouseMoveListener;
  imgTouchMoveListener;
  lensTouchMoveListener;
  
  constructor(
    private renderer: Renderer2,
    private ngxZoomService: NgxImgZoomService
    ) {
      this.zoomBreakPoints = this.ngxZoomService.zoomBreakPoints;
    }

    zoomMode: NgxImgZoomMode = this.ngxZoomService.zoomMode;
    @ViewChild('img', { static: false }) imgElmRef: ElementRef;
    @ViewChild('result', { static: false }) resultElmRef: ElementRef;
    @ViewChild('container', { static: false }) containerElmRef: ElementRef;


    @Input() enableZoom = false;
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
      if (this.notFirstTime) {
        this.imageZoom();
      }
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

  handleZoomOutOnMouseWheelUp() {
    if (this.enableZoom) {
      if (this.zoomBreakPoints.length - 1 > this.zoomIndex) {
        this.zoomIndex++;
      }
      this.lensStyle = `height: ${this.zoomBreakPoints[this.zoomIndex].h}px; width: ${this.zoomBreakPoints[this.zoomIndex].w}px;`;
      this.imageZoom();
      this.moveLens(this.lastEventBeforeTheWheel); // Called to keep the position of the lens unchanged.
    }
  }

  handleZoomInOnMouseWheelUp() {
    if (this.enableZoom) {
      if (this.zoomIndex > 0) {
        this.zoomIndex--;
      }
      this.lensStyle = `height: ${this.zoomBreakPoints[this.zoomIndex].h}px; width: ${this.zoomBreakPoints[this.zoomIndex].w}px;`;
      this.imageZoom();
      this.moveLens(this.lastEventBeforeTheWheel); // Called to keep the position of the lens unchanged.
    }
  }

  ngAfterViewInit() {
    this.img = this.imgElmRef.nativeElement;
    this.result = this.resultElmRef.nativeElement;
    this.container = this.containerElmRef.nativeElement;

    this.renderer.setAttribute(this.img, 'style', <string>this.imgStyle);
    this.renderer.setAttribute(this.result, 'style', <string>this.resultStyle);
    this.renderer.setAttribute(this.container, 'style', <string>this.containerStyle);
    this.imageZoom();
    
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    this.lensMouseMoveListener = this.renderer.listen(this.lens, 'mousemove', this.moveLens.bind(this));
    this.imgMouseMoveListener = this.renderer.listen(this.img, 'mousemove', this.moveLens.bind(this));

    /*and also for touch screens:*/
    this.imgTouchMoveListener = this.renderer.listen(this.img, 'touchmove', this.moveLens.bind(this));
    this.lensTouchMoveListener = this.renderer.listen(this.lens, 'touchmove', this.moveLens.bind(this));

    this.renderer.setStyle(this.lens, 'visibility', 'hidden');	
  }

  ngOnDestroy(){
    this.lensMouseMoveListener && this.lensMouseMoveListener();
    this.imgMouseMoveListener && this.imgMouseMoveListener();
    this.imgTouchMoveListener && this.imgTouchMoveListener();
    this.lensTouchMoveListener && this.lensTouchMoveListener();
  }

  imageZoom() {
    /*create lens:*/
    if (!this.lens) {
      this.lens = this.renderer.createElement('DIV');
      this.renderer.addClass(this.lens, 'img-zoom-lens');
      // this.renderer.addClass(this.lens, 'cursor-crosshair');
      this.renderer.insertBefore(this.img.parentElement, this.lens, this.img);
    }

    /*insert lens:*/
    this.renderer.setAttribute(this.lens, 'style', <string>this.lensStyle);

    /*calculate the ratio between result DIV and lens:*/
      this.cx = this.result.offsetWidth / this.lens.offsetWidth;
      this.cy = this.result.offsetHeight / this.lens.offsetHeight;

    /*set background properties for the result DIV:*/
    this.renderer.setStyle(this.result, 'backgroundImage', "url('" + this.zoomImage + "')");
    this.renderer.setStyle(this.result, 'backgroundSize', (this.img.width * this.cx) + 'px ' + (this.img.height * this.cy) + 'px');
    // this.renderer.setStyle(this.img.parentElement, 'position', 'relative')

    
  }

  moveLens(e) {
    this.lastEventBeforeTheWheel = e;
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
      } else if (x < 0) {
        x = 0;
      } 
       if (y > this.img.height - this.lens.offsetHeight) {
        y = this.img.height - this.lens.offsetHeight;
      } else if (y < 0 ) {
        y = 0;
      } 
      this.hide = false;
      if (this.showResult) {
        this.renderer.setStyle(this.lens, 'left', x + 'px');
        this.renderer.setStyle(this.lens, 'top', y + 'px');
        /*display what the lens 'sees':*/
        this.renderer.setStyle(this.result, 'backgroundPosition', '-' + (x * this.cx) + 'px -' + (y * this.cy) + 'px');
        this.renderer.setStyle(this.lens, 'visibility', 'visible');
      }
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
