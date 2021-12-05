import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { NewsletterService } from './../../../services/newsletter.service';
import { NewsletterDto } from './../../../model/newsletter';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  addEditNewsletterDTO: NewsletterDto = new NewsletterDto();

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(public crudApi: NewsletterService,
              public toastr: ToastrService,
              public router: Router
  ) {
    
  }

  ngOnInit() {
    
  }

  submit() {
    console.log('Data send--', this.addEditNewsletterDTO);
    this.crudApi.addNewsletterDTO(this.addEditNewsletterDTO).subscribe(
      (response: NewsletterDto) => {
        console.log('Response--', response);

        this.toastr.success('avec succès','Inscription validée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("home").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }


}
