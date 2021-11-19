import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { EmailService } from './../../../services/email.service';
import { EmailDto, MailDto } from './../../../model/email';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  mailDTO: MailDto = new MailDto();
  emails: MailDto;

  constructor(private mailService: EmailService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router
  ) { }

  ngOnInit(): void {

  }

  sendEmail() {
    this.mailService.sendEmailToManager(this.mailDTO)
      .subscribe(data => {
        console.log(data);
        this.toastr.error('avec succès','Email envoyé', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("home/email-success").then(() => {
          window.location.reload();
        });
    });

  }

  onSubmit() {
    this.sendEmail();
  }

}
