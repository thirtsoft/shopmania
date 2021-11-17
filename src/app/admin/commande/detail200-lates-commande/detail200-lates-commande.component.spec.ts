import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail200LatesCommandeComponent } from './detail200-lates-commande.component';

describe('Detail200LatesCommandeComponent', () => {
  let component: Detail200LatesCommandeComponent;
  let fixture: ComponentFixture<Detail200LatesCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail200LatesCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail200LatesCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
