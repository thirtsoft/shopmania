import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInShopComponent } from './search-in-shop.component';

describe('SearchInShopComponent', () => {
  let component: SearchInShopComponent;
  let fixture: ComponentFixture<SearchInShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
