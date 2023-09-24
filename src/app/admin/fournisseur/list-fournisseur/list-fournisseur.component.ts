import { EnvoiEmailFournisseurComponent } from './../envoi-email-fournisseur/envoi-email-fournisseur.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DialogService } from './../../../services/dialog.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { FournisseurService } from './../../../services/fournisseur.service';
import { AddFournisseurComponent } from './../add-fournisseur/add-fournisseur.component';
import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';


@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurDTOList: FournisseurDto[];
  deleteFournisseur: Fournisseur;

  id : number;
  p : number=1;
  searchText;

  fournisseurDTO : FournisseurDto = new FournisseurDto();

  constructor(private crudApi: FournisseurService,
              private router: Router,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddFournisseurComponent>,
  ){}

  ngOnInit(): void {
    this.getListFournisseurDTOs();
  }

  public getListFournisseurDTOs(): void {
    this.crudApi.getAllActiveFournisseurs().subscribe(
      (response: FournisseurDto[]) => {
        this.fournisseurDTOList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteFournisseurById(id).subscribe(data => {
          this.toastr.error('avec succès','Fournisseurs supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/fournisseurs").then(() => {
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet fournisseur, veuillez verifiez");
          }
        );
      }
    });
  }


}
