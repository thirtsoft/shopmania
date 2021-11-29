import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFactureComponent } from './customer-facture.component';

describe('CustomerFactureComponent', () => {
  let component: CustomerFactureComponent;
  let fixture: ComponentFixture<CustomerFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
