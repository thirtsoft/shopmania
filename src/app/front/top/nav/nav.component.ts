import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { TokenStorageService } from './../../../auth/token-storage.service';
import { UtilisateurService } from './../../../services/utilisateur.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  info: any;
  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email: String;
  userId;
  photo;
  img: boolean;

  currentUser;


  constructor(private tokenService: TokenStorageService,
              public userService: UtilisateurService,
              public autService: AuthService,
              public dialog: MatDialog,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
      this.userId = user.id;
      this.photo = user.photo;

      this.currentUser = this.autService.getCurrentUser();

      console.log(this.autService.getCurrentUser());

      const loginUser = this.autService.getCurrentLogginUser();
      console.log("Current user " + loginUser);

    }

  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
    this.router.navigateByUrl("home");
  }

  getProfile() {
    this.router.navigate(['/home/profile/' + this.userId]);
  }

  getTS() {
    return this.currentTime;
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
  logout2(){
  //  sessionStorage.removeItem("user-data");
    let _html=`
      <div class="c-red">
        <div class="material-icons">task_alt</div>
        <h1>Logout Success!</h1>
      </div>`;
    this.openDialog(_html);
    this.router.navigate(["home"]);
  }

}
