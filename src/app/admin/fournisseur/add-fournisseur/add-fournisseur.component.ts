import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from './../../../services/article.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Article } from './../../../model/article';
import { Fournisseur } from './../../../model/fournisseur';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {

  public formDataFournisseur: Fournisseur = new Fournisseur();
  public deleteFournisseur: Fournisseur;
  listArticleData: Article[];

  constructor(private fournisseurService: FournisseurService,
              private articleService: ArticleService,
              private router: Router){}

  ngOnInit(): void {
    this.getListArticles();

  }

  getListArticles() {
    this.articleService.getArticles().subscribe(
      (response: Article[]) => {
        this.listArticleData = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddFournisseur() {
    this.fournisseurService.addFournisseur(this.formDataFournisseur).subscribe(
      (response: Fournisseur) => {
       console.log("Add Fournisseur successfully");
        this.router.navigate(['/fournisseurs']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditArticle() {

  }


}
