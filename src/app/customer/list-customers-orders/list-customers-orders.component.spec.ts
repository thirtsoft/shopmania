import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomersOrdersComponent } from './list-customers-orders.component';

describe('ListCustomersOrdersComponent', () => {
  let component: ListCustomersOrdersComponent;
  let fixture: ComponentFixture<ListCustomersOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomersOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
