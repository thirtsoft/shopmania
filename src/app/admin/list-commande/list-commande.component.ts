import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeDto } from '../../model/commande';
import { CommandeService } from '../../services/commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


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
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getCommandeDtos();
  }

  public getCommandeDtos(): void {
    this.comService.getCommandeDtos().subscribe(
      (response: CommandeDto[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCommande(com: CommandeDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.comService.deleteCommandeDto(com.id).subscribe(data => {
          this.toastr.warning('Commande supprimé avec succès!');
          this.commandeDTOList = this.commandeDTOList.filter(u => u !== com);
          this.getCommandeDtos();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }

}
