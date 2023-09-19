import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from './../../../auth/token-storage.service';
import { AuthService } from './../../../auth/auth.service';
import { Login } from './../../../auth/login';

@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.css']
})
export class SeConnecterComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginInfo: Login;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
      //        private location: Location
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    console.log(this.form);
    this.loginInfo = new Login(
      this.form.username,
      this.form.password,
      );

    this.authService.attemptAuth(this.loginInfo).subscribe(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveUsername(data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigateByUrl("admin/accueil");
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    location.reload();
  }

  reloadHomePage() {
    this.router.navigateByUrl("admin/accueil", { skipLocationChange: true }).then(() => {
      this.router.navigate(['singIn']);
    });
  }

}