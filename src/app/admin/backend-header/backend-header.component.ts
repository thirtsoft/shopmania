import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './../../services/dashboard.service';
import { UtilisateurService } from './../../services/utilisateur.service';
import { TokenStorageService } from './../../auth/token-storage.service';

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.scss']
})
export class BackendHeaderComponent implements OnInit {

  numberOfNotificationInMonth: any;
  numberOfCustomerEmail: any;

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


  constructor(private dashboardService: DashboardService,
              private router: Router,
              public toastr: ToastrService,
              private tokenService: TokenStorageService,
              public userService: UtilisateurService,
  ){}

  ngOnInit(): void {

    this.getNumberOfNotificationInMonth();

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

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;

    }

  }

  logout() {
    this.tokenService.signOut();
    this.router.navigateByUrl("admin");
  //  window.location.reload();
  }

  getProfile() {
    this.router.navigate(['/admin/accueil/profile/' + this.userId]);
  }

  goToHistoriqueConnexion() {
    this.router.navigateByUrl("admin/accueil/historique-Connection");
  }

  getTS() {
    return this.currentTime;
  }


  getNumberOfNotificationInMonth(): void {
    this.dashboardService.countNumberOfNotification()
      .subscribe(response => {
      this.numberOfNotificationInMonth = response;
    });
  }



}
