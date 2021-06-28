import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from './../../../services/article.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleDto } from './../../../model/article';


@Component({
  selector: 'app-searchby-price',
  templateUrl: './searchby-price.component.html',
  styleUrls: ['./searchby-price.component.css']
})
export class SearchbyPriceComponent implements OnInit {

  articleListDTOBs: ArticleDto[];

  constructor(private artService: ArticleService,
              private router: Router,
  ){ }

  ngOnInit() {

    this.getArticleListDTOs();

  }

  public getArticleListDTOs() {
    this.artService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.articleListDTOBs = response;
        console.log("List ArticleDTO Price", this.articleListDTOBs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
/*
  searchArticleByPrice(price: number) {
    console.log("price+++", price);
    this.router.navigateByUrl('/searchbyPrice/'+price);

  }
  */

}
