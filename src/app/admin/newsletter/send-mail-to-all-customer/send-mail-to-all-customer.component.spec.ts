import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailToAllCustomerComponent } from './send-mail-to-all-customer.component';

describe('SendMailToAllCustomerComponent', () => {
  let component: SendMailToAllCustomerComponent;
  let fixture: ComponentFixture<SendMailToAllCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMailToAllCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailToAllCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
