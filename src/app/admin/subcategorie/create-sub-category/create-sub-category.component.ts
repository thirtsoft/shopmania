import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../../../services/category.service';
import { SScategoryService } from './../../../services/scategory.service';
import { ScategoryDto } from './../../../model/scategory';
import { CategoryDto } from './../../../model/category';

import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {

  addEditScategoryDTO: ScategoryDto = new ScategoryDto();
  categoryListDTO: CategoryDto[];

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(public crudApi: SScategoryService,
              public catService: CategoryService,
              public toastr: ToastrService,
              public router : Router,
              public actRoute: ActivatedRoute,
  ) {
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getScategoryDTOById(this.paramId);
    }

    this.getListCategoryDTOs();

  }

  getScategoryDTOById(id: number) {
    console.log('getOne');
    this.crudApi.getScategoryDtoById(id).subscribe(
      (response: ScategoryDto) => {
        console.log('data--', response);
        this.addEditScategoryDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  getListCategoryDTOs() {
    this.catService.getCategorieDTOs().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  submit() {
    console.log('Data send--', this.addEditScategoryDTO);
    this.crudApi.addScategoryDto(this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        console.log('Response--', response);

        this.toastr.success('avec succès','Sous-Categorie Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/scategories").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  update() {
    console.log('Data send--', this.addEditScategoryDTO);
    this.crudApi.updateScategoryDto(this.addEditScategoryDTO.id, this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        this.toastr.warning('avec succès','Sous-Categorie Modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/scategories").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  goBack() {
    this.router.navigateByUrl('admin/scategories');
  }

}
