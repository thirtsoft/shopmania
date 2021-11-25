import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './../../services/dashboard.service';
import { UtilisateurService } from './../../services/utilisateur.service';


@Component({
  selector: 'app-backend-sidebar',
  templateUrl: './backend-sidebar.component.html',
  styleUrls: ['./backend-sidebar.component.scss']
})
export class BackendSidebarComponent implements OnInit {


  info: any;
  private roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  userId;



  constructor(public userService: UtilisateurService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              private router: Router,
  ){}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
      this.showUserBoard = this.roles.includes('ROLE_USER');

  //    this.username = user.username;
      this.userId = user.id;


    }

  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
    this.router.navigateByUrl("admin");
  }

  getProfile() {
    this.router.navigate(['/admin/profile/' + this.userId]);
  }


  getTS() {
    return this.currentTime;
  }


}
