import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { DialogService } from './../../../services/dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryService } from './../../../services/country.service';

import { AddCountrieComponent } from './../add-countrie/add-countrie.component';
import { CountryDto } from './../../../model/country';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  countriesDTOList: CountryDto[];
  deleteCountry: CountryDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private crudApi: CountryService,
              private router: Router,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddCountrieComponent>,
  ){}

  ngOnInit(): void {
    this.getListCountriesDTOs();
  }

  public getListCountriesDTOs(): void {
    this.crudApi.getAllActiveCountries().subscribe(
      (response: CountryDto[]) => {
        this.countriesDTOList = response;
        console.log(this.countriesDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCreateCountrie(){
    this.crudApi.choixmenu == "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCountrieComponent, dialogConfig);
  }

  selectData(item : CountryDto) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCountrieComponent, dialogConfig);
  }

  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCountryById(id).subscribe(data => {
          this.toastr.error('avec succès','Countrie supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/countries").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet countrie, veuillez verifiez");
          }
        );
      }
    });
  }

}
