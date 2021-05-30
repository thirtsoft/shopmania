import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScategoryComponent } from './update-scategory.component';

describe('UpdateScategoryComponent', () => {
  let component: UpdateScategoryComponent;
  let fixture: ComponentFixture<UpdateScategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
