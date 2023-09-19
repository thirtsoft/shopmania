import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { DialogService } from './../../../services/dialog.service';
import { BlogService } from './../../../services/blog.service';

import { BlogDto } from './../../../model/blog';

import { UploadFileComponent } from './../../article/upload-file/upload-file.component';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {

  blogDTOList: BlogDto[];
  editArticle: BlogDto;
  deleteArticle: BlogDto;

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: BlogService,
              public matDialog: MatDialog,
              public router: Router,
              public dialogService: DialogService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UploadFileComponent>,

  ){}

  ngOnInit(): void {
    this.getListBlogDtos();
  }

  public getListBlogDtos(): void {
    this.crudApi.getBlogDtosOrderByIdDesc().subscribe(
      (response: BlogDto[]) => {
        this.blogDTOList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onAddNewBlog() {
    this.router.navigateByUrl("admin/accueil/blog");
  }

  editPhotoBlog(item : BlogDto) {
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
        this.crudApi.deleteBlogDto(id).subscribe(data => {
          this.toastr.error('avec succès','Blog supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/blogs").then(() => {
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