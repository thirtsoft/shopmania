import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../auth/auth.service';
import { Register } from './../../../auth/register';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  user = new Register('','','','',[]);
  submitted = false;
  isRegistered = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any = [
    { name: 'Assistant', id:1, selected: true },
    { name: 'Manager', id:2, selected: false },
    { name: 'Admin', id:3, selected: false },
  ];
  selectedRoles: string[];

  constructor(private authService: AuthService,
              private toastr :ToastrService,
              private router : Router
  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      roleSelection: this.createRoles(this.roles),
    });
  }

  createRoles(rolesList): FormArray {
    const arr = rolesList.map(role => {
      return new FormControl(role.selected)
    });
    return new FormArray(arr);
  }

  onSubmit() {
    this.submitted = true;
    this.user.name = this.registrationForm.value.name;
    this.user.username = this.registrationForm.value.username;
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    this.user.roles = this.getSelectedRoles();
    this.registerUser();
  }

  registerUser() {
    this.authService.signUp(this.user)
    .subscribe(response=> {
      this.isRegistered = true;
      this.isSignUpFailed = false;
      this.toastr.success('avec succès','Utilisateur crée', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("/admin/signIn");
    },
    error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
    }
    );

  }

  getSelectedRoles():string[]  {
    this.selectedRoles = this.registrationForm.value.roleSelection.map((selected:any, i) => {
      if(selected){
        return this.roles[i].name;
      }else {
        return '';
      }
    });
    // return selected roles
    return this.selectedRoles.filter(function (element) {
      if (element !== '') {
        console.log("ElementReturn: " +element);
        return element;
      }
    });
  }



}
