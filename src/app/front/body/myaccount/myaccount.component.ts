import { LigneCommandeDto } from './../../../model/ligne-commande';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { UtilisateurDto } from './../../../model/utilisateur';
import { AuthService } from './../../../auth/auth.service';
import { TokenStorageService } from './../../../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommandeDto } from './../../../model/commande';
import { CommandeService } from './../../../services/commande.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { LigneLigneCommandeService } from 'src/app/services/lignecommande.service';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  listCommandeDataDTO: CommandeDto[];
  listDataProfil: UtilisateurDto;

  currentPage: number = 1;
  totalPages: number;
  pages: Array<number>;

  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;

  username: string;
  email: String;
  userId;

  currentUser;

  id : number;
  p : number=1;
  searchText;
  paramId :any = 0;
  comId: number;



  constructor(private crudApi: CommandeService,
              private tokenService: TokenStorageService,
              public autService: AuthService,
              public userService: UtilisateurService,
              public lcmdService: LigneLigneCommandeService,
              private router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  //  this.getEmploye();
 //   this.getAllLigneCommandeByCommandeId();
    this.paramId = this.route.snapshot.paramMap.get('id');
     console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getCommandeDTOByUserId(this.paramId);
    }

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.username = user.username;
      this.userId = user.id;

      this.currentUser = this.autService.getCurrentUser();

      console.log(this.autService.getCurrentUser());

      const loginUser = this.autService.getCurrentLogginUser();
      console.log("Current user " + loginUser);

    }

  }


  getCommandeDTOByUserId(id: number) {
    this.crudApi.getCommandeDtoByUserIdOrderDesc(id).subscribe(
      (response: CommandeDto[]) => {
        console.log('data--', response);
        this.listCommandeDataDTO = response;
          for (let i = 0; i  < this.listCommandeDataDTO.length; i++) {
            this.comId = this.listCommandeDataDTO[i].id;
            this.lcmdService.getLigneCommandeDtosByCommandeId(this.comId).subscribe((data: LigneCommandeDto[]) => {
            this.lcmdService.listData = data;
            console.log('resp--', data);
        
        }, err => {
      console.log(err);
    })
  }
  
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getAllLigneCommandeByCommandeId() {
    for (let i = 0; i  < this.listCommandeDataDTO.length; i++) {
      this.comId = this.listCommandeDataDTO[i].id;
      this.lcmdService.getLigneCommandeDtosByCommandeId(this.comId).subscribe((data: LigneCommandeDto[]) => {
        this.lcmdService.listData = data;
    }, err => {
      console.log(err);
    })
  }
  }

  getListLigneCommandes(item: LigneCommandeDto[]) {
  }

  getEmploye() {
    const user = this.tokenService.getUser();
    console.log(user.id);
    this.userService.getUtilisateurDtoById(user.id).subscribe(
      response => {
        console.log(response);
        this.listDataProfil = response;
      }
    );
  }


  logout(){
    sessionStorage.removeItem("user-data");
    let _html=`
      <div class="c-red">
        <div class="material-icons">task_alt</div>
        <h1>Logout Success!</h1>
      </div>`;
    this.router.navigate(["home"]);
  }

}
