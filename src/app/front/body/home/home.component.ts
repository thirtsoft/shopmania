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

  constructor(){}

  ngOnInit(): void {}
  
}
