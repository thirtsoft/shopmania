import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from './../../../services/category.service';
import { SScategoryService } from './../../../services/scategory.service';
import { CategoryDto } from './../../../model/category';
import { ScategoryDto } from './../../../model/scategory';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-scategory',
  templateUrl: './add-scategory.component.html',
  styleUrls: ['./add-scategory.component.scss']
})
export class AddScategoryComponent implements OnInit {

  addEditScategoryDTO: ScategoryDto = new ScategoryDto();
  categoryListDTO: CategoryDto[];

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(private scatService: SScategoryService,
              private catService: CategoryService,
              private toastr: ToastrService,
              private router: Router,
              public dialog: MatDialog,
              private actRoute: ActivatedRoute,

  ){
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getScategoryDTOById(this.paramId);
    }

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
  getScategoryDTOById(id: number) {
    console.log('getOne');
    this.scatService.getScategoryDtoById(id).subscribe(
      (response: ScategoryDto) => {
        console.log('data--', response);
        this.addEditScategoryDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  submit() {
    console.log('Data send--', this.addEditScategoryDTO);
    this.scatService.addScategoryDto(this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        console.log('Response--', response);
        let _html=`
          <div class="c-green">
            <div class="material-icons">task_alt</div>
            <h1>Product Created Success!</h1>
          </div>`;
          this.openDialog(_html);
          this.router.navigate([`/admin/scategories`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  update() {
    console.log('Data send--', this.addEditScategoryDTO);
    this.scatService.updateScategoryDto(this.addEditScategoryDTO.id, this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        console.log('Response--', response);
        let _html=`
            <div class="c-green">
              <div class="material-icons">task_alt</div>
              <h1>Scategory Update Success!</h1>
            </div>`;

        this.openDialog(_html);
        this.router.navigate([`/admin/scategories`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  /*
  public onAddScategory() {
    this.scatService.addScategoryDto(this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        this.dialogRef.close();
        this.toastr.success("Scategory Ajouté avec Succès");
        this.router.navigate(['/backend/admin/scategories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 */

}
