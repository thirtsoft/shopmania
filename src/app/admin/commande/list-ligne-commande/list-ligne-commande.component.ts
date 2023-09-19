import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogService } from './../../../services/dialog.service';

import { LigneCommandeDto } from './../../../model/ligne-commande';
import { LigneLigneCommandeService } from './../../../services/lignecommande.service';

@Component({
  selector: 'app-list-ligne-commande',
  templateUrl: './list-ligne-commande.component.html',
  styleUrls: ['./list-ligne-commande.component.scss']
})
export class ListLigneCommandeComponent implements OnInit {

  ligneCommandeDTOList: LigneCommandeDto[];

  id : number;
  p : number=1;
  searchText;

  constructor(private lcomService: LigneLigneCommandeService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getLigneCommandeDtos();
  }

  public getLigneCommandeDtos(): void {
    this.lcomService.getAllActiveLigneCommandes().subscribe(
      (response: LigneCommandeDto[]) => {
        this.ligneCommandeDTOList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onDeleteligneCommande(item) {}

}
