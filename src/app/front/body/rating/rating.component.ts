import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TokenStorageService } from './../../../auth/token-storage.service';
import { CatalogueService } from './../../../services/catalogue.service';
import { NotificationService } from './../../../services/notification.service';
import { NotificationDto } from './../../../model/notification';
import { ArticleService } from './../../../services/article.service';
import { ArticleDto } from './../../../model/article';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  addNotificationDTO = new NotificationDto();
  addRatingForm: NgForm;
  userId: any;
  ref: string;
  formData:  FormGroup;
  articleDTOs: ArticleDto = new ArticleDto();
  currentRating: number = 0;
  maxRatingValue = 5;

  constructor(private ratingService: NotificationService,
              private catalogueService: CatalogueService,
              private artService: ArticleService,
              private tokenService: TokenStorageService,
              public fb: FormBuilder,
              private actRoute: ActivatedRoute
  ) { }

  get f() { return this.formData.controls; }


  ngOnInit(): void {

    this.infoForm();

    this.getSingleArticleDTO();

    this.ratingService.getUserId();

  }

  infoForm() {
    this.formData = this.fb.group({
      nbreEtoile: [this.currentRating, Validators.required],
      observation: ['', Validators.required],
    });

  }

  onRateChange(event :number) {
    console.log("The selected rate change ", event);
    this.currentRating = event;
  }

  public getSingleArticleDTO() {
    this.ref = this.actRoute.snapshot.paramMap.get('reference');
    this.artService.getArticleDtoByReference(this.ref).subscribe(
      response => {
        this.articleDTOs = response;
        console.log(this.articleDTOs);
        }
        ,(error: HttpErrorResponse) => {
      alert(error.message);
    });

  }

  onSubmit() {
    console.log(this.formData.value);
    console.log(this.formData.value, this.ref, this.ratingService.id);
    this.ratingService.addRatingToArticle(this.formData.value, this.ref, this.ratingService.id)
      .subscribe(
      (response: NotificationDto) => {
        alert("Note Attribué avec succès");
        console.log('Response--', response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }


  onSelectFile(event) {
   // selectionner une image et la garder
    const file = event.target.files[0];
  //  this.articleFile = file;
  }



}
