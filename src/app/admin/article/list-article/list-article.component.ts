import { ArticleDto } from './../../../model/article';
import { SScategoryService } from './../../../services/scategory.service';
import { AddArticleComponent } from './../add-article/add-article.component';
import { Scategory } from './../../../model/scategory';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../model/article';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  articles: Article[];
  articleDTOList: ArticleDto[];

  editArticle: Article;
  deleteArticle: Article;

  listDataScategories: Scategory[];
  id : number;
  p : number=1;
  searchText;

  constructor(private articleService: ArticleService,
              private scategorieService: SScategoryService,
              private dialog:MatDialog,
              private router: Router){}

  ngOnInit(): void {
    this.getScategories();
    this.getArticles();
    this.getArticleDTOs();
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

  public getArticleDTOs(): void {
    this.articleService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.articleDTOList = response;
        console.log(this.articleDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getScategories(): void {
    this.scategorieService.getScategories().subscribe(
      (response: Scategory[]) => {
        this.listDataScategories = response;
        console.log(this.listDataScategories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddArticle() {
    this.openNoteDialog(null);
  }
  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddArticleComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.articles.push(result);
      }
      // this.refreshData();
    });
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
