import { UpdateStatusCommandeComponent } from './../update-status-commande/update-status-commande.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from './../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommandeService } from './../../services/commande.service';
import { CommandeDto } from './../../model/commande';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-list-commande-encours',
  templateUrl: './list-commande-encours.component.html',
  styleUrls: ['./list-commande-encours.component.css']
})
export class ListCommandeEncoursComponent implements OnInit {

  commandeDTOList: CommandeDto[];
  deleteCommandeDTO: CommandeDto;

  id : number;
  p : number=1;
  searchText;

  formData: FormGroup;

  constructor(private comService: CommandeService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogService: DialogService
  ){}


  ngOnInit(): void {
    this.getCommandeDtosByStatusPending();
  }

  public getCommandeDtosByStatusPending(): void {
    this.comService.getCommandeDtosByStatusPending().subscribe(
      (response: CommandeDto[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditStatusCommande(item : CommandeDto) {
    this.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.dialog.open(UpdateStatusCommandeComponent, dialogConfig);

  }


  onDeleteCommande(item) {}

 /*  public onDeleteCommande(com: CommandeDto): void{
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
  } */

}
