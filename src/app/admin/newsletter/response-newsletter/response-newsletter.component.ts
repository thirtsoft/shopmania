import { NewsletterService } from './../../../services/newsletter.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EmailDto } from './../../../model/email';
import { EmailService } from './../../../services/email.service';

@Component({
  selector: 'app-response-newsletter',
  templateUrl: './response-newsletter.component.html',
  styleUrls: ['./response-newsletter.component.css']
})
export class ResponseNewsletterComponent implements OnInit {

  mailDTO: EmailDto = new EmailDto();

  constructor(public crudApi: NewsletterService,
              public mailService: EmailService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<ResponseNewsletterComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      customerEmail: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

  }


  onSubmit() {
    this.mailService.sendEmailToCustomer(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success('avec succès','Email envoyé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/accueil/newsletters").then(() => {
        window.location.reload();
      });
    });
  }


}
