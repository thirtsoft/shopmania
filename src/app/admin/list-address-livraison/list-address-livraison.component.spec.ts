import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressLivraisonComponent } from './list-address-livraison.component';

describe('ListAddressLivraisonComponent', () => {
  let component: ListAddressLivraisonComponent;
  let fixture: ComponentFixture<ListAddressLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddressLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddressLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
