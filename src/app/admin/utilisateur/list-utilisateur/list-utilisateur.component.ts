import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';

import { UtilisateurService } from './../../../services/utilisateur.service';
import { UtilisateurDto } from './../../../model/utilisateur';

import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { DialogComponent } from './../../../shared/dialog/dialog.component';


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

  currentTime: number = 0;
  img: boolean;

  constructor(public crudApi: UtilisateurService,
              private router: Router,
               private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {

    this.getUtilisateurDTOs();

    if (this.crudApi.getUserAvatar(this.id) === null)
      this.img = false;
    else this.img = true;

  }

  public getUtilisateurDTOs(): void {
    this.crudApi.getAllUtilisateurDtosOrderByIdDesc().subscribe(
      (response: UtilisateurDto[]) => {
        this.utilisateurDTOList = response;
        console.log(this.utilisateurDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  getTS() {
    return this.currentTime;
  }


  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteUtilisateurDto(id).subscribe(data => {
          this.toastr.error('avec succès','Utilisateur supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/utilisateurs").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet utilisateur, veuillez verifiez");
          }
        );
      }
    });
  }



}
