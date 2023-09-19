
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-in-shop',
  templateUrl: './search-in-shop.component.html',
  styleUrls: ['./search-in-shop.component.css']
})
export class SearchInShopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  searchArticleInShop(keyword: string) {
    this.router.navigateByUrl('/searchInshop/'+keyword);

  }

}
