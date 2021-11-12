import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeEncoursComponent } from './list-commande-encours.component';

describe('ListCommandeEncoursComponent', () => {
  let component: ListCommandeEncoursComponent;
  let fixture: ComponentFixture<ListCommandeEncoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandeEncoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandeEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
