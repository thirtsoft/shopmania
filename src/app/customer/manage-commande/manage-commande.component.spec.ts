import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommandeComponent } from './manage-commande.component';

describe('ManageCommandeComponent', () => {
  let component: ManageCommandeComponent;
  let fixture: ComponentFixture<ManageCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
