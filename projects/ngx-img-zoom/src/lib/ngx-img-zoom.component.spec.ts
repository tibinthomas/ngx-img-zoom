import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImgZoomComponent } from './ngx-img-zoom.component';

describe('NgxImgZoomComponent', () => {
  let component: NgxImgZoomComponent;
  let fixture: ComponentFixture<NgxImgZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxImgZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImgZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
