import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountrieComponent } from './add-countrie.component';

describe('AddCountrieComponent', () => {
  let component: AddCountrieComponent;
  let fixture: ComponentFixture<AddCountrieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCountrieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCountrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
