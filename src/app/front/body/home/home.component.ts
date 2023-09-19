import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { DialogService } from '../../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { CatalogueService } from '../../../services/catalogue.service';
import { ArticleService } from '../../../services/article.service';
import { ArticleDto } from '../../../model/article';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articleDTOList: ArticleDto[];
  editArticle: ArticleDto;
  deleteArticle: ArticleDto;

  id : number;
  p : number=1;
  searchText;
  private currentTime: number=0;

  constructor(private articleService: ArticleService,
              public catService: CatalogueService,
              private dialog: MatDialog,
              private router: Router,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
  //  this.getListArticleDTOs();
  }

  public getListArticleDTOs(): void {
    this.articleService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.articleDTOList = response;
        console.log(this.articleDTOList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getTS() {
    return this.currentTime;
  }

  public onGetDetails(artilce: ArticleDto) {

  }


}
