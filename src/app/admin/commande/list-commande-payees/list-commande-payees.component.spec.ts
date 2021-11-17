import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandePayeesComponent } from './list-commande-payees.component';

describe('ListCommandePayeesComponent', () => {
  let component: ListCommandePayeesComponent;
  let fixture: ComponentFixture<ListCommandePayeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandePayeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandePayeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
