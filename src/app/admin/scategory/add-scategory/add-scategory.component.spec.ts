import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScategoryComponent } from './add-scategory.component';

describe('AddScategoryComponent', () => {
  let component: AddScategoryComponent;
  let fixture: ComponentFixture<AddScategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
