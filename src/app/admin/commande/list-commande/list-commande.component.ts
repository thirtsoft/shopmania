import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { CommandeDto } from './../../../model/commande';
import { DialogService } from './../../../services/dialog.service';
import { CommandeService } from './../../../services/commande.service';


@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  commandeDTOList: CommandeDto[];
  deleteCommandeDTO: CommandeDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private comService: CommandeService,
              private router: Router,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getCommandeDtos();
  }

  public getCommandeDtos(): void {
    this.comService.getCommandeDtosOrderByIdDesc().subscribe(
      (response: CommandeDto[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  viewCommande(item: CommandeDto) {
    this.router.navigateByUrl('admin/accueil/commandeView/' + item.id);
  }

  onDeleteCommande(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.comService.deleteCommandeDto(id).subscribe(data => {
          this.toastr.error('avec succès','Commande supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/listcommandes").then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

}
