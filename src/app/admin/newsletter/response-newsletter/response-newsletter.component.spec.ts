import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseNewsletterComponent } from './response-newsletter.component';

describe('ResponseNewsletterComponent', () => {
  let component: ResponseNewsletterComponent;
  let fixture: ComponentFixture<ResponseNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
