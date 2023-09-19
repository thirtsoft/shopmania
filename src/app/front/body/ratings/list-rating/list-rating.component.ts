import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationDto } from './../../../../model/notification';
import { NotificationService } from './../../../../services/notification.service';


@Component({
  selector: 'app-list-rating',
  templateUrl: './list-rating.component.html',
  styleUrls: ['./list-rating.component.css']
})
export class ListRatingComponent implements OnInit {

  notificationListDTO: NotificationDto[];

  currentTime: number = 0;

  searchMode: boolean = false;

  starRating = 0;

  currentRating = 4;

  maxRatingValue = 5;

  constructor(private ratingService: NotificationService
  ){ }

  ngOnInit(): void {
    this.getListOfTop3RatingOrderByCreatedDateDesc();

  }


  public getListOfTop3RatingOrderByCreatedDateDesc() {
    this.ratingService.getTop3RatingOrderByCreatedDateDesc()
      .subscribe(
      (response: NotificationDto[]) => {
        this.notificationListDTO = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }


}
