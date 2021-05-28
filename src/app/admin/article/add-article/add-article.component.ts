import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ScategoryDto } from './../../../model/scategory';
import { ArticleDto } from './../../../model/article';
import { SScategoryService } from '../../../services/scategory.service';
import { Scategory } from '../../../model/scategory';
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
              private router: Router,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddArticleComponent>
  ){}

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
        this.dialogRef.close();
        this.toastr.success("Article Ajouté avec Succès");
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
