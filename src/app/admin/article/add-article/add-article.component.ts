import { ScategoryDto } from './../../../model/scategory';
import { ArticleDto } from './../../../model/article';
import { Component, OnInit } from '@angular/core';
import { SScategoryService } from '../../../services/scategory.service';
import { Scategory } from '../../../model/scategory';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../model/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  addEditArticleDTO: ArticleDto = new ArticleDto();
  deleteArticleDTO: ArticleDto;
  scategoryListDTO: ScategoryDto[];

  constructor(private articleService: ArticleService,
              private scategorieService: SScategoryService,
              private router: Router){}

  ngOnInit(): void {
    this.getListScategoryDTOs();

  }

  getListScategoryDTOs() {
    this.scategorieService.getScategoryDtos().subscribe(
      (response: ScategoryDto[]) => {
        this.scategoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddArticle() {
    this.articleService.addArticleDto(this.addEditArticleDTO).subscribe(
      (response: ArticleDto) => {
       console.log("Add Article successfully");
        this.router.navigate(['/backend/admin/articles']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditArticle() {

  }


}
