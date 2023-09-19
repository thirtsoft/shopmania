import { TokenStorageService } from './../../../../auth/token-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../auth/auth.service';
import { UpdateProfilInfo } from './../../../../auth/profil-info';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-customer-username',
  templateUrl: './update-customer-username.component.html',
  styleUrls: ['./update-customer-username.component.css']
})
export class UpdateCustomerUsernameComponent implements OnInit {

  formDataProfile: UpdateProfilInfo  = new UpdateProfilInfo();

  isLoggedIn = false;

  userId;

  constructor(public crudApi: AuthService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdateCustomerUsernameComponent>,
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.userId = user.id;
      const loginUser = this.crudApi.getCurrentLogginUser();
    }
  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      id: null,
      oldUsername: '',
      name: '',
      username: '',
      email: '',
      mobile: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile);
    this.crudApi.updateCustomerProfil(this.formDataProfile).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('veuillez vous reconnectez','Votre Profile a ete modifie avec success', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.logout();
    });

  }

  logout(){
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
  }

}
