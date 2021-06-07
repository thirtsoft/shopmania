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

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(private articleService: ArticleService,
              private scategorieService: SScategoryService,
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

  submit() {
    console.log('Data send--', this.addEditArticleDTO);
    this.articleService.addArticleDto(this.addEditArticleDTO).subscribe(
      (response: ArticleDto) => {
        console.log('Response--', response);
        let _html=`
          <div class="c-green">
            <div class="material-icons">task_alt</div>
            <h1>Product Created Success!</h1>
          </div>`;
          this.openDialog(_html);
          this.router.navigate([`/admin/articles`]);
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
        console.log('Response--', response);
        let _html=`
            <div class="c-green">
              <div class="material-icons">task_alt</div>
              <h1>Product Update Success!</h1>
            </div>`;

        this.openDialog(_html);
        this.router.navigate([`/admin/articles`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }
/*
  public onAddArticle() {
    this.articleService.addArticleDto(this.addEditArticleDTO).subscribe(
      (response: ArticleDto) => {
        this.dialogRef.close();
        this.toastr.success("Article Ajouté avec Succès");
        this.router.navigate(['/backend/admin/articles']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditArticle() { }

  */


}
