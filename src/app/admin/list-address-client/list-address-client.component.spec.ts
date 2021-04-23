import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressClientComponent } from './list-address-client.component';

describe('ListAddressClientComponent', () => {
  let component: ListAddressClientComponent;
  let fixture: ComponentFixture<ListAddressClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddressClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddressClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
