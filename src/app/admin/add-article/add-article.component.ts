import { SScategoryService } from './../../services/scategory.service';
import { Scategory } from './../../model/scategory';
import { Category } from './../../model/category';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from './../../services/article.service';
import { Article } from './../../model/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  public editArticle: Article = new Article();
  public deleteArticle: Article;
  listScategorie: Scategory[];

  constructor(private articleService: ArticleService,
              private scategorieService: SScategoryService,
              private router: Router){}

  ngOnInit(): void {
    this.getListScategories();

  }

  getListScategories() {
    this.scategorieService.getScategories().subscribe(
      (response: Scategory[]) => {
        this.listScategorie = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddArticle() {
    this.articleService.addArticle(this.editArticle).subscribe(
      (response: Article) => {
       console.log("Add Article successfully");
        this.router.navigate(['/articles']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditArticle() {

  }


}
