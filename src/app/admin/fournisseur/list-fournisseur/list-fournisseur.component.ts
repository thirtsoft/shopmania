import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddFournisseurComponent } from './../add-fournisseur/add-fournisseur.component';

import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';


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
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getListFournisseurDTOs();
  }

  public getListFournisseurDTOs(): void {
    this.crudApi.getFournisseurDTOs().subscribe(
      (response: FournisseurDto[]) => {
        this.fournisseurDTOList = response;
        console.log(this.fournisseurDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteFournisseurDto(id).subscribe(data => {
          this.toastr.error('avec succès','Fournisseurs supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/fournisseurs").then(() => {
            window.location.reload();
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
