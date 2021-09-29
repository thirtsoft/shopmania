import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteByMonthBarChartComponent } from './vente-by-month-bar-chart.component';

describe('VenteByMonthBarChartComponent', () => {
  let component: VenteByMonthBarChartComponent;
  let fixture: ComponentFixture<VenteByMonthBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteByMonthBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteByMonthBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
