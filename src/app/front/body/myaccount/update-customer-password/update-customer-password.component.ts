import { TokenStorageService } from './../../../../auth/token-storage.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from './../../../../auth/auth.service';
import { UpdatePasswordInfo } from './../../../../auth/profil-info';

@Component({
  selector: 'app-update-customer-password',
  templateUrl: './update-customer-password.component.html',
  styleUrls: ['./update-customer-password.component.css']
})
export class UpdateCustomerPasswordComponent implements OnInit {

  formDataProfile: UpdatePasswordInfo  = new UpdatePasswordInfo();

  constructor(public crudApi: AuthService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdateCustomerPasswordComponent>,
  ) { }

  ngOnInit() {
  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      username: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile);
    this.crudApi.updatePassword(this.formDataProfile).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('veuillez vous reconnectez','Votre Mot de pqsse a ete modifie avec success', {
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
