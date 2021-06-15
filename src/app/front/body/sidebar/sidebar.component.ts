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
    this.scatService.getScategoryDtos().subscribe(
      (response: ScategoryDto[]) => {
        this.scategoryListDTOs = response;
        console.log(this.scategoryListDTOs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

}
