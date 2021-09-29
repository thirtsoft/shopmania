import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListTop12OrderByCreatedDateDescComponent } from './article-list-top12-order-by-created-date-desc.component';

describe('ArticleListTop12OrderByCreatedDateDescComponent', () => {
  let component: ArticleListTop12OrderByCreatedDateDescComponent;
  let fixture: ComponentFixture<ArticleListTop12OrderByCreatedDateDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListTop12OrderByCreatedDateDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListTop12OrderByCreatedDateDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
