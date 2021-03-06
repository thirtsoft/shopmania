import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEmailComponent } from './success-email.component';

describe('SuccessEmailComponent', () => {
  let component: SuccessEmailComponent;
  let fixture: ComponentFixture<SuccessEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
