import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SScategoryService } from './../../../services/scategory.service';
import { Scategory } from './../../../model/scategory';

@Component({
  selector: 'app-list-scategory',
  templateUrl: './list-scategory.component.html',
  styleUrls: ['./list-scategory.component.scss']
})
export class ListScategoryComponent implements OnInit {

  public scategories: Scategory[];
  public editScategory: Scategory;
  public deleteScategory: Scategory;

  constructor(private scategorieService: SScategoryService,
              private router: Router){}

  ngOnInit(): void {
    this.getScategories();
  }

  public getScategories(): void {
    this.scategorieService.getScategories().subscribe(
      (response: Scategory[]) => {
        this.scategories = response;
        console.log(this.scategories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateScayegorie() {
    this.router.navigate(['/newScategorie']);
  }

  addEditScategorie(i) {

  }
  public onDeleteScategorie(scategorieId: number): void {
    this.scategorieService.deleteScategory(scategorieId).subscribe(
      (response: void) => {
        console.log(response);
        this.getScategories();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
