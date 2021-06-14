import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';


import { DialogService } from './../../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';

import { AddArticleComponent } from './../add-article/add-article.component';
import { ArticleService } from '../../../services/article.service';
import { ArticleDto } from '../../../model/article';



@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  articleDTOList: ArticleDto[];
  editArticle: ArticleDto;
  deleteArticle: ArticleDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private articleService: ArticleService,
              public catService: CatalogueService,
              private dialog: MatDialog,
              private router: Router,

  ){}

  ngOnInit(): void {
    this.getListArticleDTOs();
  }

  public getListArticleDTOs(): void {
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

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        html: _html,
      }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  confirmDialog(id) {
    let dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteArticle(id);
      }
    })
  }

  public onDeleteArticle(id: number): void{
    console.log('delete');
    console.log('id--', id);
    this.articleService.deleteArticleDto(id).subscribe(data => {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Article Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
    /*
    if(res) {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Article Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();
    } else {
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    }
    */
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
        this.articleDTOList.push(result);
      }
      // this.refreshData();
    });
  }

  addEditArticle(i) {

  }
 // onDeleteArticle(item) {}

 /*   public onDeleteArticle(article: ArticleDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.articleService.deleteArticleDto(article.id).subscribe(data => {
          this.toastr.warning('Article supprimé avec succès!');
          this.articleDTOList = this.articleDTOList.filter(u => u !== article);
          this.getListArticleDTOs();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
 */
}
