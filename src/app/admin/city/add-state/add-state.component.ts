import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CountryService } from './../../../services/country.service';
import { StateService } from './../../../services/state.service';
import { StateDto } from './../../../model/state';
import { CountryDto } from './../../../model/country';

import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {

  listCountriesDTO: CountryDto[];
  formDataStateDTO = new StateDto();
  addStateForm: NgForm;

  constructor(public crudApi: StateService,
              private countryService: CountryService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddStateComponent>,
  ) {}

  ngOnInit() {
    this.getListCountrieDTOs();
    if (!isNullOrUndefined(this.data.id)) {
      console.log(this.crudApi.listData[this.data.id]);
      this.formDataStateDTO = Object.assign({},this.crudApi.listData[this.data.id])
    }
  }

  getListCountrieDTOs() {
    this.countryService.getCountryDTOs().subscribe((response) => {
      this.listCountriesDTO = response as CountryDto[];});
  }

  initForm() {
    this.formDataStateDTO = {
      id: null,
      name:"",
      countryDto: new CountryDto(),
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (isNullOrUndefined(this.data.id)) {
      this.crudApi.addStateDto(this.formDataStateDTO).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success('avec succès','Départment Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/states").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Cet Déparment exist déjà, veuillez changez le code");
        }
      );

    }else {
      console.log(this.formDataStateDTO.id, this.formDataStateDTO);
      this.crudApi.updateStateDto(this.formDataStateDTO.id, this.formDataStateDTO).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.warning('avec succès','Départment Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/states").then(() => {
          window.location.reload();
        });

      });

    }

  }

  saveState() {
    if (isNullOrUndefined(this.data.scatId)) {
      this.crudApi.addStateDto(this.addStateForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success('avec succès','Départment Ajouté', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/states").then(() => {
        });
      });
    }
  }

  updateState(addStateForm: NgForm) {
    if (!isNullOrUndefined(this.data.scatId)) {
      this.crudApi.updateStateDto(addStateForm.value.id, addStateForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.warning('avec succès','Départment Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/states").then(() => {
        });
      });
    }
  }


}
