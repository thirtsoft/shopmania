import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArrivalsComponent } from './news-arrivals.component';

describe('NewsArrivalsComponent', () => {
  let component: NewsArrivalsComponent;
  let fixture: ComponentFixture<NewsArrivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArrivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
