import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../services/category.service';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { UtilisateurDto } from './../../../model/utilisateur';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.scss']
})
export class AddUtilisateurComponent implements OnInit {

  addEditUtilisateurDTO: UtilisateurDto = new UtilisateurDto();

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(public crudApi: UtilisateurService,
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
      this.getUtilisateurDTOById(this.paramId);
    }

  }

  getUtilisateurDTOById(id: number) {
    console.log('getOne');
    this.crudApi.getUtilisateurDtoById(id).subscribe(
      (response: UtilisateurDto) => {
        console.log('data--', response);
        this.addEditUtilisateurDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ResetForm() {
   // this.crudApi.dataForm.reset();
  }

  submit() {
    console.log('Data send--', this.addEditUtilisateurDTO);
    this.crudApi.addUtilisateurDto(this.addEditUtilisateurDTO).subscribe(
      (response: UtilisateurDto) => {
        console.log('Response--', response);

        this.toastr.success('avec succès','Utilisateurs Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/utilisateurs").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  update() {
    console.log('Data send--', this.addEditUtilisateurDTO);
    this.crudApi.updateUtilisateurDto(this.addEditUtilisateurDTO.id, this.addEditUtilisateurDTO).subscribe(
      (response: UtilisateurDto) => {
        this.toastr.warning('avec succès','Utulisateur Modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("admin/utilisateurs").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  goBack() {
    this.router.navigateByUrl('admin/utilisateurs');
  }

}
