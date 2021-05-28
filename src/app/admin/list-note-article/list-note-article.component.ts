import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationDto } from '../../model/notification';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';


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
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
              ){}

  ngOnInit(): void {
    this.getNotificationDtos();
  }

  public getNotificationDtos(): void {
    this.noteService.getNotificationDtos().subscribe(
      (response: NotificationDto[]) => {
        this.notificationDTOList = response;
        console.log(this.notificationDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNotification(note: NotificationDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.noteService.deleteNotificationDto(note.id).subscribe(data => {
          this.toastr.warning('Notification supprimé avec succès!');
          this.notificationDTOList = this.notificationDTOList.filter(u => u !== note);
          this.getNotificationDtos();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }

}
