import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurDto } from './../../../model/utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';
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
              private router: Router,
               private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService,
  ){}

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

  confirmDialog(id) {
    let dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteUtilisateur(id);
      }
    })
  }

  public onDeleteUtilisateur(user: UtilisateurDto): void{
    console.log('delete');
    console.log('id--', user);
    const res = this.userService.deleteUtilisateurDto(user.id);
    if(res) {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>User Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();
    } else {
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    }


  }


/*
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

    });
  }
  */
 // onDeleteUtilisateur(item) {}

 /*  public onDeleteUtilisateur(user: UtilisateurDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.userService.deleteUtilisateurDto(user.id).subscribe(data => {
          this.toastr.warning('Utilisateur supprimé avec succès!');
          this.utilisateurDTOList = this.utilisateurDTOList.filter(u => u !== user);
          this.getUtilisateurDTOs();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  } */

}
