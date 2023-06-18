import { EmailService } from './../../../services/email.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { DialogService } from './../../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';

import { NewsletterService } from './../../../services/newsletter.service';
import { NewsletterDto } from './../../../model/newsletter';

import { ResponseNewsletterComponent } from './../response-newsletter/response-newsletter.component';

@Component({
  selector: 'app-list-newsletter',
  templateUrl: './list-newsletter.component.html',
  styleUrls: ['./list-newsletter.component.css']
})
export class ListNewsletterComponent implements OnInit {

  newsletterDTOList: NewsletterDto[];
  newsletterDtoDTO : NewsletterDto = new NewsletterDto();

  id : number;
  p : number=1;
  searchText;

  constructor(private crudApi: NewsletterService,
              public mailService: EmailService,
              private router: Router,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<ListNewsletterComponent>,
  ){}

  ngOnInit(): void {
    this.getListNewsletterDTOs();
  }

  public getListNewsletterDTOs(): void {
    this.crudApi.getAllActiveNewsletters().subscribe(
      (response: NewsletterDto[]) => {
        this.newsletterDTOList = response;
        console.log(this.newsletterDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  confirmDialog(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer ce visiteur ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteNewsletterById(id).subscribe(data => {
          this.toastr.error('avec succès','Visiteur supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/accueil/newsletters").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer ce visiteur, veuillez verifiez");
          }
        );
      }
    });
  }

  envoiEmailToCustomer(item: NewsletterDto) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    console.log(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(ResponseNewsletterComponent, dialogConfig);
  }

  sendMailToAllCustomer() {
    for (let i = 0; i < this.newsletterDTOList.length; i++) {
      this.newsletterDtoDTO.customerEmail = this.newsletterDTOList[i].customerEmail;
      this.newsletterDtoDTO.subject = this.newsletterDTOList[i].subject;
      this.newsletterDtoDTO.message = this.newsletterDTOList[i].message;

    }
    this.mailService.sendMailDTOToAllCustomer(this.newsletterDtoDTO).
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
