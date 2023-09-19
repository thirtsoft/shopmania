import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { BlogDto } from './../../../model/blog';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  addEditBlogDto: BlogDto = new BlogDto();
  blogFile: any = File;

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  editPhoto: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  currentTime: number = 0;
  id;

  userId;
  img: boolean;

  constructor(public crudApi: BlogService,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private actRoute: ActivatedRoute,
  ){
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    if(this.paramId  && this.paramId  > 0){
      this.getBlogDtoById(this.paramId);
    }

  }

  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    if(this.paramId  && this.paramId  > 0){
      this.paramId = p;
      this.editPhoto=true;
    }
    this.editPhoto=false;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.crudApi.uploadPhotoBlogDto(this.currentFileUpload, this.addEditBlogDto.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.editPhoto=false;
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment de la photo");
      }
    );
    this.selectedFiles = undefined;
  }

  getBlogDtoById(id: number) {
    this.crudApi.getBlogDtoById(id).subscribe(
      (response: BlogDto) => {
        this.addEditBlogDto = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  update() {
    this.crudApi.updateBlogDto(this.addEditBlogDto.id, this.addEditBlogDto).subscribe(
      (response: BlogDto) => {
        this.toastr.warning('avec succès','Blog Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/blogs").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    );
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.blogFile = file;
  }

  // Ajouter un blog avec sa photo
  onSaveBlog() {
    let formData = new FormData();
    formData.append('blog', JSON.stringify(this.addEditBlogDto));
    formData.append('photoBlog', this.blogFile);
    this.crudApi.addBlogDtoWithPhoto(formData)
      .subscribe((response: BlogDto)=> {
        this.toastr.success('avec succès','Blog Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/accueil/blogs").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  goBack() {
    this.router.navigate([`/admin/accueil/blogs`]);
  }


}
