import { HttpErrorResponse } from '@angular/common/http';
import { AddStateComponent } from './../add-state/add-state.component';
import { FormBuilder } from '@angular/forms';
import { DialogService } from './../../../services/dialog.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StateService } from './../../../services/state.service';
import { StateDto } from './../../../model/state';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-list-states',
  templateUrl: './list-states.component.html',
  styleUrls: ['./list-states.component.css']
})
export class ListStatesComponent implements OnInit {

  statesDTOList: StateDto[];

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: StateService,
              private router: Router,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddStateComponent>,
  ){}

  ngOnInit(): void {
    this.getListStatesDTOs();
  }

  public getListStatesDTOs(): void {
    this.crudApi.getAllStateDTOsOrderByIdDesc().subscribe(
      (response: StateDto[]) => {
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCreateState(){
    this.crudApi.choixmenu == "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddStateComponent, dialogConfig);
  }

  addEditState(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(AddStateComponent, dialogConfig);

  }

  selectData(item : StateDto) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddStateComponent, dialogConfig);
  }

  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteStateDto(id).subscribe(data => {
          this.toastr.error('avec succès','Departement supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/states").then(() => {
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet department, veuillez verifiez");
          }
        );
      }
    });
  }


}
