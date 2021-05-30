import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArtileComponent } from './update-artile.component';

describe('UpdateArtileComponent', () => {
  let component: UpdateArtileComponent;
  let fixture: ComponentFixture<UpdateArtileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArtileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArtileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
