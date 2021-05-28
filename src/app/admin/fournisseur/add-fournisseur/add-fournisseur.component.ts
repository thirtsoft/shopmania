import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from './../../../services/article.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Article, ArticleDto } from './../../../model/article';
import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {

  formDataFournisseurDTO: FournisseurDto = new FournisseurDto();
  deleteFournisseurDTO: FournisseurDto;
  ListArticleDTO: ArticleDto[];

  constructor(private fournisseurService: FournisseurService,
              private articleService: ArticleService,
              private router: Router){}

  ngOnInit(): void {
    this.getListArticleDTOs();

  }

  getListArticleDTOs() {
    this.articleService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.ListArticleDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddFournisseur() {
    this.fournisseurService.addFournisseurDto(this.formDataFournisseurDTO).subscribe(
      (response: FournisseurDto) => {
       console.log("Add Fournisseur successfully");
        this.router.navigate(['/backend/admin/fournisseurs']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditArticle() {

  }


}
