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
  subcategoryListDTO: ScategoryDto[];

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
    if(this.paramId  && this.paramId  > 0){
      this.getScategoryDTOById(this.paramId);
    }
    this.getListCategoryDTOs();
  }

  getScategoryDTOById(id: number) {
    this.crudApi.getScategoryDtoById(id).subscribe(
      (response: ScategoryDto) => {
        this.addEditScategoryDTO = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Erreur lors de la récupération de la sous-catégorie");
      }
    );

  }


  getListCategoryDTOs() {
    this.catService.getAllActiveCategories().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        this.toastr.error("Erreur lors de la récupération de la liste des categories");
      }
    )
  }

  getListSuCategories() {
    this.crudApi.getAllActiveSubCategories().subscribe(
      (response: ScategoryDto[]) => {
        this.subcategoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        this.toastr.error("Erreur lors de la récupération de la liste des sous-categories");
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
        this.toastr.success('avec succès','Sous-Categorie Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/scategories").then(() => {
          this.getListSuCategories();
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Erreur, la sous-categorie n\'est pas crée");
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

        this.router.navigateByUrl("admin/accueil/scategories").then(() => {
          this.getListSuCategories();
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Erreur lors de la modification de la sous-categorie");
      }

    );
  }

  goBack() {
    this.router.navigateByUrl('admin/accueil/scategories');
  }

}
