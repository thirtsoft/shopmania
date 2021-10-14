import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusCommandeComponent } from './update-status-commande.component';

describe('UpdateStatusCommandeComponent', () => {
  let component: UpdateStatusCommandeComponent;
  let fixture: ComponentFixture<UpdateStatusCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatusCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
