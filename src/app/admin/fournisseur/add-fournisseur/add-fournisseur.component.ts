import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from './../../../services/article.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Article, ArticleDto } from './../../../model/article';
import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
              private router: Router,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddFournisseurComponent>
  ){}

  ngOnInit(): void {
    this.getListArticleDTOs();

  }

  public getListArticleDTOs(): void {
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
        this.dialogRef.close();
        this.toastr.success("Fournisseur Ajouté avec Succès");
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
