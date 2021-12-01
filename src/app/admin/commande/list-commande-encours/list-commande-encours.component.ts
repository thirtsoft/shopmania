import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommandeService } from './../../../services/commande.service';
import { CommandeDto } from './../../../model/commande';
import { UpdateStatusCommandeComponent } from '../update-status-commande/update-status-commande.component';

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

  constructor(private crudApi: CommandeService,
              private router: Router,
              private matDialog: MatDialog,
              public toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UpdateStatusCommandeComponent>,
  ){}


  ngOnInit(): void {
    this.getCommandeDtosByStatusPending();
  }

  public getCommandeDtosByStatusPending(): void {
    this.crudApi.getCommandeDtosByStatusPending().subscribe(
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
    this.crudApi.choixmenu == 'M';
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateStatusCommandeComponent, dialogConfig);

  }


  viewAllCommandes() {
    this.router.navigate(['/admin/accueil/commandes']);
  }
}
