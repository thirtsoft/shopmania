import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { ProfilComponent } from './profil/profil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuccessRegisterComponent } from './success-register/success-register.component';


@NgModule({
  declarations: [
    RegisterComponent,
    SuccessRegisterComponent,
    LoginComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
