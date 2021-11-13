import { CatalogueService } from './../../../services/catalogue.service';
import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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

  public articleFile: any = File;

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(private articleService: ArticleService,
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
    this.articleService.getArticleDtoById(id).subscribe(
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
    this.articleService.updateArticleDto(this.addEditArticleDTO.id, this.addEditArticleDTO).subscribe(
      (response: ArticleDto) => {
        this.toastr.warning('avec succès','Article Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/articles").then(() => {
          window.location.reload();
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
    this.articleService.addArticleDtoWithPhoto(formData)
      .subscribe((response: ArticleDto)=> {
        console.log('Response--', response);
        this.toastr.success('avec succès','Article Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/articles").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goBack() {
    this.router.navigate([`/admin/articles`]);
  }


}
