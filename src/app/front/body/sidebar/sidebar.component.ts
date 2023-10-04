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

  constructor(private scatService: SScategoryService,

  ) {}

  ngOnInit(): void {
    this.getScategoryListDTOs();
  }
  public getScategoryListDTOs() {
    this.scatService.getAllActiveSubCategories().subscribe(
      (response: ScategoryDto[]) => {
        this.scategoryListDTOs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

}
