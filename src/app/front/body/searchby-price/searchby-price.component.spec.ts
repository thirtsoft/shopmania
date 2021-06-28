import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyPriceComponent } from './searchby-price.component';

describe('SearchbyPriceComponent', () => {
  let component: SearchbyPriceComponent;
  let fixture: ComponentFixture<SearchbyPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbyPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
