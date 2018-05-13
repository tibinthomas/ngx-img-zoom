import { TestBed, inject } from '@angular/core/testing';

import { NgxImgZoomService } from './ngx-img-zoom.service';

describe('NgxImgZoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxImgZoomService]
    });
  });

  it('should be created', inject([NgxImgZoomService], (service: NgxImgZoomService) => {
    expect(service).toBeTruthy();
  }));
});
