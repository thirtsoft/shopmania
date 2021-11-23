import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerUsernameComponent } from './update-customer-username.component';

describe('UpdateCustomerUsernameComponent', () => {
  let component: UpdateCustomerUsernameComponent;
  let fixture: ComponentFixture<UpdateCustomerUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
