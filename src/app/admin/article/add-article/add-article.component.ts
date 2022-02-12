import { CatalogueService } from './../../../services/catalogue.service';
import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ScategoryDto } from './../../../model/scategory';
import { ArticleDto } from './../../../model/article';
import { SScategoryService } from '../../../services/scategory.service';
import { ArticleService } from '../../../services/article.service';



@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  addEditArticleDTO: ArticleDto = new ArticleDto();
  deleteArticleDTO: ArticleDto;
  scategoryListDTO: ScategoryDto[];
  currentProduct;

  public articleFile: any = File;

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

  constructor(private crudApi: ArticleService,
              private scategorieService: SScategoryService,
              public catService: CatalogueService,
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
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getArticleDTOById(this.paramId);
    }

    this.getListScategoryDTOs();

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

  /* onSelectedFile(event) {
    this.selectedFiles = event.target.files[0];
    const file = event.target.files[0];
    this.currentFileUpload = file;
  } */

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    console.log(this.currentFileUpload);
    console.log(this.paramId);
    this.crudApi.uploadPhotoArticleDto(this.currentFileUpload, this.addEditArticleDTO.id)
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

  /*
  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    console.log(this.currentFileUpload);
    console.log(this.paramId);
    this.crudApi.uploadPhotoArticleDtoInFolder(this.currentFileUpload, this.addEditArticleDTO.id)
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
  */

  getListScategoryDTOs() {
    this.scategorieService.getScategoryDtos().subscribe(
      (response: ScategoryDto[]) => {
        this.scategoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getArticleDTOById(id: number) {
    console.log('getOne');
    this.crudApi.getArticleDtoById(id).subscribe(
      (response: ArticleDto) => {
        console.log('data--', response);
        this.addEditArticleDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  update() {
    console.log('Data send--', this.addEditArticleDTO);
    this.crudApi.updateArticleDto(this.addEditArticleDTO.id, this.addEditArticleDTO).subscribe(
      (response: ArticleDto) => {
        this.toastr.warning('avec succès','Article Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/articles").then(() => {
    //      window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  onSelectFile(event) {
   // selectionner une image et la garder
    const file = event.target.files[0];
    this.articleFile = file;
  }

  // Ajouter un produits avec sa photo
  onSaveArticle() {
    let formData = new FormData();
    formData.append('article', JSON.stringify(this.addEditArticleDTO));
    formData.append('photoArticle', this.articleFile);
    this.crudApi.addArticleDtoWithPhoto(formData)
      .subscribe((response: ArticleDto)=> {
        console.log('Response--', response);
        this.toastr.success('avec succès','Article Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/accueil/articles").then(() => {
        //  window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 /*
  onSaveArticle() {
    let formData = new FormData();
    formData.append('article', JSON.stringify(this.addEditArticleDTO));
    formData.append('photoArticle', this.articleFile);
    this.crudApi.addArticleDtoWithPhotoInFolder(formData)
      .subscribe((response: ArticleDto)=> {
        console.log('Response--', response);
        this.toastr.success('avec succès','Article Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/accueil/articles").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
*/

  goBack() {
    this.router.navigate([`/admin/accueil/articles`]);
  }


}
