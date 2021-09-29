import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteByYearBarChartComponent } from './vente-by-year-bar-chart.component';

describe('VenteByYearBarChartComponent', () => {
  let component: VenteByYearBarChartComponent;
  let fixture: ComponentFixture<VenteByYearBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteByYearBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteByYearBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
