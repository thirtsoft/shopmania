import { CatalogueService } from './../../../services/catalogue.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SScategoryService } from './../../../services/scategory.service';
import { ArticleService } from './../../../services/article.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ScategoryDto } from './../../../model/scategory';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleDto } from './../../../model/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-artile',
  templateUrl: './update-artile.component.html',
  styleUrls: ['./update-artile.component.scss']
})
export class UpdateArtileComponent implements OnInit {


  addEditArticleDTO: ArticleDto = new ArticleDto();
  deleteArticleDTO: ArticleDto;
  scategoryListDTO: ScategoryDto[];

  articleFile: any = File;

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
        console.log(error.message);
      }
    )
  }

  getArticleDTOById(id: number) {
    this.articleService.getArticleDtoById(id).subscribe(
      (response: ArticleDto) => {
        this.addEditArticleDTO = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  goBack() {
    this.router.navigate([`/admin/accueil/articles`]);
  }

}
