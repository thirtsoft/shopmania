import { DialogComponent } from './../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../shared/dialog-confirm/dialog-confirm.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDto } from '../../model/client';
import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientDTOList: ClientDto[];
  deleteClientDTO: ClientDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private clientService: ClientService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getListClientDtos();
  }

  public getListClientDtos(): void {
    this.clientService.getClientDTOsOrderByIdDesc().subscribe(
      (response: ClientDto[]) => {
        this.clientDTOList = response;
        console.log(this.clientDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        html: _html,
      }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  confirmDialog(id) {
    let dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteClient(id);
      }
    })
  }

  public onDeleteClient(id: number): void{
    console.log('delete');
    console.log('id--', id);
    this.clientService.deleteClientDto(id).subscribe(data => {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Client Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );

  }
/*
  public onDeleteClient(id: number): void{
    console.log('delete');
    console.log('id--', id);
    const res = this.clientService.deleteClientDto(id);
    if(res) {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Client Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();
    } else {
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    }
  }
*/

//  onDeleteClient(item) {}

  /*  public onDeleteClient(client: ClientDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.clientService.deleteClientDto(client.id).subscribe(data => {
          this.toastr.warning('Client supprimé avec succès!');
          this.clientDTOList = this.clientDTOList.filter(u => u !== client);
          this.getListClientDtos();
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
