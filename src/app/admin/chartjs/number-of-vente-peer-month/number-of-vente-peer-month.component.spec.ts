import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfVentePeerMonthComponent } from './number-of-vente-peer-month.component';

describe('NumberOfVentePeerMonthComponent', () => {
  let component: NumberOfVentePeerMonthComponent;
  let fixture: ComponentFixture<NumberOfVentePeerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfVentePeerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfVentePeerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
