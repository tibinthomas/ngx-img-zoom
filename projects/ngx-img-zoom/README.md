# ngx-img-zoom

## Project status

Still in early development, more features are planned and incoming. Should be in a working 
state right now but it's not tested in lots of different setups yet.

Demonstration of available features available [here](https://ngx-img-zoom.firebaseapp.com/).

## About

ngx-img-zoom is inspired by [angular2-image-zoom](https://github.com/brtnshrdr/angular2-image-zoom) and 
JQuery libraries such as [jQuery Zoom](http://www.jacklmoore.com/zoom/) and
[elevateZoom-plus](http://igorlino.github.io/elevatezoom-plus/) but a pure Angular2+ implementation of
similar concepts. Also it has Angular Universal support too.
## Available options

Option | Default&#160;value | Description | Example value
:---:|:---:|:---:|-
zoomImageSrc | *none* | (Required) Image that should appear in zoom window. | 'https://www.myimage.com/imagename.jpg'
previewImageSrc | *none* | (Required) Image to appear in the preview window. | 'https://www.myimage.com/imagename.jpg'
imgStyle | *"'width:300px; height:300px'"* | CSS Style for the main image container | "'width:400px; height:400px'"
resultStyle | *"'width:300px; height:300px'"* | CSS Style for the result container. Here result is a new window that appears only when you hover over the image | "'width:400px; height:400px'"
lensStyle | *"'width:30px; height:30px'"* | CSS Style for the lense. It appers only on top of the main image when you hover over it  | "'width:40px; height:40px'"
containerStyle | *'position: absolute'* | CSS Style for the container that holds all the 3 elements mentioned above  | "'width:400px; height:400px'"


## Installation

To install this library, run:

```bash
$ npm i ngx-img-zoom --save
```

## Using this library

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { NgxImageZoomModule } from 'ngx-img-zoom';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxImgZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its component in your Angular application:

```xml
<!-- You can now use ngx-img-zoom component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngx-img-zoom
    [imgSrc]="imgSrc" 
    [imgStyle]="'width:515px; height:515px; bottom:0;  left:0;  right:0;  top:0;  margin:0 auto; border:1px solid #dcdcdc;'" 
    [resultStyle]="`width:824px; height:824px; background-repeat: no-repeat; z-index: 2; position:absolute;
                   -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); top: 0;left: 100%;`"
    [lensStyle]="'width:155px; height:155px"
    [containerStyle]=""
></ngx-img-zoom>
```

## License

MIT © Tibin Thomas