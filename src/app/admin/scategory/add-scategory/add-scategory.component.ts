import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { SScategoryService } from './../../../services/scategory.service';
import { CategoryDto } from './../../../model/category';
import { ScategoryDto } from './../../../model/scategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-scategory',
  templateUrl: './add-scategory.component.html',
  styleUrls: ['./add-scategory.component.scss']
})
export class AddScategoryComponent implements OnInit {

  addEditScategoryDTO: ScategoryDto = new ScategoryDto();
  deleteArticleDTO: ScategoryDto;
  categoryListDTO: CategoryDto[];

  constructor(private scatService: SScategoryService,
              private catService: CategoryService,
              private router: Router){}

  ngOnInit(): void {
    this.getListCategoryDTOs();

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

  public onAddScategory() {
    this.scatService.addScategoryDto(this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
       console.log("Add Scategory successfully");
        this.router.navigate(['/backend/admin/scategories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditScategory() {

  }


}
