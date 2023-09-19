import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { CountryService } from './../../../services/country.service';
import { CountryDto } from './../../../model/country';

@Component({
  selector: 'app-add-countrie',
  templateUrl: './add-countrie.component.html',
  styleUrls: ['./add-countrie.component.css']
})
export class AddCountrieComponent implements OnInit {

  formDataCountryDTO: CountryDto = new CountryDto();

  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(public crudApi: CountryService,
              public router: Router,
              public toastr: ToastrService,
              public dialog: MatDialog,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddCountrieComponent>,

  ){}

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
    //  id: 0,
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(validatorString)]],
    });
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A"){
      this.saveCountry();
      this.dialogRef.close();
    }else{
        this.updateCountrie();
    }
  }

  saveCountry() {
    this.crudApi.addCountryDto(this.crudApi.dataForm.value)
      .subscribe(response => {
        this.dialogRef.close();
        this.toastr.success('avec succès','Région Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/countries").then(() => {
          window.location.reload();
        });
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Cette Région exist déjà, veuillez changez de code");
        }
      );
  }

  updateCountrie(){
    this.crudApi.updateCountryDto(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('avec succès','Région Modifier', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/accueil/countries").then(() => {
        window.location.reload();
      });
    });
  }

  goBack() {
    this.router.navigateByUrl("admin/accueil/countries");
  }

}
