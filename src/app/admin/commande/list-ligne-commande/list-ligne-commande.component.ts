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
    this.lcomService.getAllLigneCommandeDtosOrderByIdDesc().subscribe(
      (response: LigneCommandeDto[]) => {
        this.ligneCommandeDTOList = response;
        console.log(this.ligneCommandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteligneCommande(item) {}

 /*  public onDeleteligneCommande(lcom: LigneCommandeDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.lcomService.deleteLigneCommandeDto(lcom.id).subscribe(data => {
          this.toastr.warning('LigneCommande supprimé avec succès!');
          this.ligneCommandeDTOList = this.ligneCommandeDTOList.filter(u => u !== lcom);
          this.getLigneCommandeDtos();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
 */

}
