import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from './../../../services/email.service';

import { FournisseurService } from './../../../services/fournisseur.service';
import { FournisseurDto } from './../../../model/fournisseur';

@Component({
  selector: 'app-envoi-email-fournisseur',
  templateUrl: './envoi-email-fournisseur.component.html',
  styleUrls: ['./envoi-email-fournisseur.component.css']
})
export class EnvoiEmailFournisseurComponent implements OnInit {

  fourDTO: FournisseurDto = new FournisseurDto();

  constructor(public crudApi: FournisseurService,
              private mailService: EmailService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<EnvoiEmailFournisseurComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

  }

  onSubmit() {
    this.mailService.sendMailDTO(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.error('avec succès','Email envoyé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/accueil/fournisseurs").then(() => {
        window.location.reload();
      });
    });
  }

  onSubmit12() {
    this.mailService.sendEmailDTO(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.error('avec succès','Email envoyé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/fournisseurs").then(() => {
        window.location.reload();
      });
    });
  }

}
