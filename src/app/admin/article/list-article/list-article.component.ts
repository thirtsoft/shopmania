import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../model/article';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  public articles: Article[];
  public editArticle: Article;
  public deleteArticle: Article;

  constructor(private articleService: ArticleService,
              private router: Router){}

  ngOnInit(): void {
    this.getArticles();
  }

  public getArticles(): void {
    this.articleService.getArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;
        console.log(this.articles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateArticle() {
    this.router.navigate(['/newArticle']);
  }

  addEditArticle(i) {

  }
  public onDeleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe(
      (response: void) => {
        console.log(response);
        this.getArticles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
