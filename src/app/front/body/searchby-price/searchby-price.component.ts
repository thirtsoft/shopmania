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
    this.artService.getAllActivesArticles().subscribe(
      (response: ArticleDto[]) => {
        this.articleListDTOBs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }
}
