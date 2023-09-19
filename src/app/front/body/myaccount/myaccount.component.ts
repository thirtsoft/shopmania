import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { TokenStorageService } from './../../../auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

import { UtilisateurService } from './../../../services/utilisateur.service';
import { UtilisateurDto } from './../../../model/utilisateur';
import { AuthService } from './../../../auth/auth.service';

import { CommandeDto } from './../../../model/commande';
import { CommandeService } from './../../../services/commande.service';

import { UpdateCustomerPasswordComponent } from './update-customer-password/update-customer-password.component';
import { UpdateCustomerUsernameComponent } from './update-customer-username/update-customer-username.component';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  listCommandeDataDTO: CommandeDto[];
  listDataProfil: UtilisateurDto = new UtilisateurDto();

  currentPage: number = 1;
  totalPages: number;
  pages: Array<number>;

  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;

  username: string;
  email: String;
  userId;

  customerName: string;
  customerUsername: string;
  customerEmail: string;
  customerMobile: string;
  customerPassword: string;

  currentUser;

  id : number;
  p : number=1;
  searchText;
  paramId :any = 0;
  comId: number;
  Errors = {status:false, msg:''};
  mySubscription: any;




  constructor(private crudApi: CommandeService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public authService: AuthService,
              public userService: UtilisateurService,
              private router: Router,
              public matDialog: MatDialog,
              private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    if(this.paramId  && this.paramId  > 0){
      this.getCommandeDTOByUserId(this.paramId);
      this.getUtilisateurDTOById(this.paramId);
    }

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.userId = user.id;
      this.currentUser = this.authService.getCurrentUser();
      const loginUser = this.authService.getCurrentLogginUser();
    }

  }


  getCommandeDTOByUserId(id: number) {
    this.crudApi.getCommandeDtoByUserIdOrderDesc(id).subscribe(
      (response: CommandeDto[]) => {
        this.listCommandeDataDTO = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }


  getUtilisateurDTOById(id: number) {
    console.log('getOne');
    this.userService.getUtilisateurDtoById(id).subscribe(
      (response: UtilisateurDto) => {
        this.listDataProfil = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  getEmploye() {
    const user = this.tokenService.getUser();
    console.log(user.id);
    this.userService.getUtilisateurDtoById(user.id).subscribe(
      response => {
        console.log(response);
        this.listDataProfil = response;
        this.customerName = this.listDataProfil.name;
        this.customerUsername = this.listDataProfil.username;
        this.customerEmail = this.listDataProfil.email;
        this.customerMobile = this.listDataProfil.mobile;
      }
    );
  }

  addEditCustomerUsername(item: UtilisateurDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.authService.listData = Object.assign({}, item);
    this.matDialog.open(UpdateCustomerUsernameComponent, dialogConfig);
  }

  addEditCustomerPassword(item: UtilisateurDto) {
    console.log(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.authService.listData = Object.assign({}, item);
    this.matDialog.open(UpdateCustomerPasswordComponent, dialogConfig);

  }

  update() {
    this.userService.updateUtilisateurDto(this.listDataProfil.id, this.listDataProfil).subscribe(
      (response: UtilisateurDto) => {
        this.toastr.warning('avec succès','Utulisateur Modifiée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("/").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    );
  }

  viewCommande(item: CommandeDto) {
    this.router.navigateByUrl('facture/' + item.id);
  }

  logout(){
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
  }

}
