import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerPasswordComponent } from './update-customer-password.component';

describe('UpdateCustomerPasswordComponent', () => {
  let component: UpdateCustomerPasswordComponent;
  let fixture: ComponentFixture<UpdateCustomerPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
