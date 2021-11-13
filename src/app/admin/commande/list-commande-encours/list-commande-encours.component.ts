import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogService } from './../../../services/dialog.service';

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

  constructor(private comService: CommandeService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UpdateStatusCommandeComponent>,
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

  viewAllCommande() {
    this.router.navigate(['/admin/commandes']);
  }
}
