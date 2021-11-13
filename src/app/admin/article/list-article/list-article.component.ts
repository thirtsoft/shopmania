import { FormBuilder } from '@angular/forms';
import { UploadFileComponent } from './../upload-file/upload-file.component';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';
import { CatalogueService } from './../../../services/catalogue.service';

import { DialogService } from './../../../services/dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

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

  constructor(public crudApi: ArticleService,
              public catService: CatalogueService,
              public matDialog: MatDialog,
              public router: Router,
              public dialogService: DialogService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UploadFileComponent>,

  ){}

  ngOnInit(): void {
    this.getListArticleDTOs();
  }

  public getListArticleDTOs(): void {
    this.crudApi.getArticleDTOsOrderByIdDesc().subscribe(
      (response: ArticleDto[]) => {
        this.articleDTOList = response;
        console.log(this.articleDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddNewArticle() {
    this.router.navigateByUrl("admin/article");
  }

  editPhotoProduct(item : ArticleDto) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UploadFileComponent, dialogConfig);

  }


  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteArticleDto(id).subscribe(data => {
          this.toastr.error('avec succès','Article supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/articles").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet Article, veuillez supprimer tous les articles lié à celle-ci");
          }
        );
      }
    });
  }


}
