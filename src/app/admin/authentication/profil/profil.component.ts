import { UtilisateurDto } from './../../../model/utilisateur';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './../../../auth/token-storage.service';

import { AuthService } from './../../../auth/auth.service';

import { UtilisateurService } from './../../../services/utilisateur.service';
import { ProfilInfo } from './../../../auth/profil-info';

import { UpdateUsernameComponent } from './../update-username/update-username.component';
import { UpdatePasswordComponent } from './../update-password/update-password.component';
import { UpdateProfilComponent } from './../update-profil/update-profil.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  name = '';
  username = '';
  password = '';

  profileInfo: ProfilInfo = {} as ProfilInfo;
  listDataProfil: UtilisateurDto = new UtilisateurDto();
  email;

  editPhoto: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title: string;
  currentRequest: string;
  currentTime: number = 0;
  id;

  userId;
  img: boolean;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              public toastr: ToastrService,
              public userService: UtilisateurService,
              private router: Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProfilComponent>,
  ) {

  }

  ngOnInit(): void {
    this.getEmploye();

    const user = this.tokenService.getUser();
    this.id = user.id

    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;

    if (this.userService.getUserAvatar(this.userId) === null)
    this.img = false;
    else this.img =true;

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

  getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    this.currentProfile = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    console.log(this.id);
    this.userService.uploadPhotoUtilisateur(this.currentFileUpload, this.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.currentTime = Date.now();
        }
      }, err => {
        this.toastr.warning("Problème de chargment de la photo");
      }
    );
    this.selectedFiles = undefined;
  }

  addEditUsername(item: UtilisateurDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.authService.listData = Object.assign({}, item)
    this.matDialog.open(UpdateUsernameComponent, dialogConfig);
  }

  addEditPassword(item: UtilisateurDto) {
    console.log(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.authService.listData = Object.assign({}, item)
    this.matDialog.open(UpdatePasswordComponent, dialogConfig);

  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('admin');
  }

  goToDashboard() {
    this.router.navigateByUrl('admin/dashborad');
  }

  editProfil(item: UtilisateurDto) {
    console.log(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.authService.listData = Object.assign({}, item)
    this.matDialog.open(UpdateProfilComponent, dialogConfig);

  }


}
