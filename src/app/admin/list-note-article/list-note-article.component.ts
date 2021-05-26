import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDto } from './../../../model/notification';
import { NotificationService } from './../../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-note-article',
  templateUrl: './list-note-article.component.html',
  styleUrls: ['./list-note-article.component.scss']
})
export class ListNoteArticleComponent implements OnInit {

  notificationDTOList: NotificationDto[];
  deleteNotificationDTO: NotificationDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private noteService: NotificationService,
              private router: Router){}

  ngOnInit(): void {
    this.getNotificationDtos();
  }

  public getNotificationDtos(): void {
    this.noteService.getLigneCommandeDtos().subscribe(
      (response: NotificationDto[]) => {
        this.notificationDTOList = response;
        console.log(this.notificationDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNotification(noteId: number): void {
    this.noteService.deleteNotificationDto(noteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNotificationDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
