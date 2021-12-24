import { CatalogueService } from './../../../services/catalogue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SScategoryService } from './../../../services/scategory.service';
import { ScategoryDto } from './../../../model/scategory';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  scategoryListDTOs: ScategoryDto[];

  numberOfProductInSubCat;

  constructor(private scatService: SScategoryService,
              private catalogue: CatalogueService

  ) {}

  ngOnInit(): void {
    this.getScategoryListDTOs();
  }

  public getScategoryListDTOs() {
    this.scatService.getScategoryDtos()
      .subscribe(
        (response: ScategoryDto[]) => {
          this.scategoryListDTOs = response;
          console.log(this.scategoryListDTOs);

          if (this.scategoryListDTOs.length>0) {
            let i;
            for (i=1; i<this.scategoryListDTOs.length; i++) {
              this.catalogue.countNumberOfArticleInSubCat(this.scategoryListDTOs[i].id)
                .subscribe(data => {
                  this.numberOfProductInSubCat = data;
                  console.log(this.numberOfProductInSubCat);
                }
              );

            }

          }

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

}
