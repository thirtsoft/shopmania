import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurDto } from './../../../model/utilisateur';
import { NotificationService } from './../../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddUtilisateurComponent } from './../add-utilisateur/add-utilisateur.component';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent implements OnInit {

  
  utilisateurDTOList: UtilisateurDto[];
  deleteUtilisateurDTO: UtilisateurDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private userService: UtilisateurService,
              private router: Router){}

  ngOnInit(): void {
    this.getUtilisateurDTOs();
  }

  public getUtilisateurDTOs(): void {
    this.userService.getUtilisateurDtos().subscribe(
      (response: UtilisateurDto[]) => {
        this.utilisateurDTOList = response;
        console.log(this.utilisateurDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 
  onAddUtilisateur() {
    this.openNoteDialog(null);
  }

  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddUtilisateurComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.utilisateurDTOList.push(result);
      }
      // this.refreshData();
    });
  }

  public onDeleteUtilisateur(userId: number): void {
    this.userService.deleteUtilisateurDto(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUtilisateurDTOs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
