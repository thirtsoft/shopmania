import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../services/article.service';
import { ArticleDto } from './../../../model/article';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  listData : ArticleDto[];

  selectedFiles;
  fileImage: File;
  message: string;
  progress: number;
  currentFileUpload: any;
  id;
  currentTime: number = 0;

  constructor(public crudApi: ArticleService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UploadFileComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      photo: ['', [Validators.required]],
    });
  }

  getListOfArticledDTOs() {
    this.crudApi.getArticleDTOs().subscribe(
      response =>{
        this.listData = response;}
    );
  }

  ResetForm() {
    this.crudApi.formData.reset();
  }

  getTS() {
    return this.currentTime;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
  }


  onSubmit() {
    this.crudApi.uploadPhotoArticleDto(this.crudApi.formData.value.id,this.crudApi.formData.value.status)
    .subscribe( data => {
      this.dialogRef.close();
        this.toastr.info('avec succès','Photo modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/articles").then(() => {
          window.location.reload();
        });
    });
  }

}