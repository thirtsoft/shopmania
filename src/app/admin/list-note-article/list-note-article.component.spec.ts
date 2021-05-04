import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoteArticleComponent } from './list-note-article.component';

describe('ListNoteArticleComponent', () => {
  let component: ListNoteArticleComponent;
  let fixture: ComponentFixture<ListNoteArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNoteArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
