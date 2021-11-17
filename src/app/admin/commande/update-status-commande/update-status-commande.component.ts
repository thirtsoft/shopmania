import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CommandeService } from '../../../services/commande.service';
import { CommandeDto } from '../../../model/commande';
import { Statuscommande } from './../../../model/statuscommande';

@Component({
  selector: 'app-update-status-commande',
  templateUrl: './update-status-commande.component.html',
  styleUrls: ['./update-status-commande.component.css']
})
export class UpdateStatusCommandeComponent implements OnInit {

  commandeDTOList : CommandeDto[];

  StatusList= ['ENCOURS','PAYEE','REJETER'];

  statuscommande: Statuscommande[];

  formData:  FormGroup;



  constructor(public crudApi: CommandeService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdateStatusCommandeComponent>,
  ) { }

  ngOnInit() {
    this.infoForm()

  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: [this.crudApi.formData.value.id,  [Validators.required]],
      status: [this.crudApi.formData.value.status, [Validators.required]],
    });
  }

  getListCommandeDTOs() {
    this.crudApi.getCommandeDtos().subscribe(
      response =>{this.commandeDTOList = response;}
    );
  }

  ResetForm() {
    this.formData.reset();
  }

  onSubmit() {
    this.crudApi.updateStatusOfCommandeDto(this.crudApi.formData.value.id,this.crudApi.formData.value.status).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('avec succès','Status Commande Modifié', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/commandes").then(() => {
        window.location.reload();
      });
     /*  window.alert('status commande modifié avec succès');
      this.toastr.success("Status Appro Modifier avec Succès");
      this.getListCommandeDTOs();
      this.router.navigate(['/admin/commandes']); */
    });
  }

  updateStatusAppro(){
    this.crudApi.updateStatusOfCommandeDto(this.formData.value.id,this.formData.value).
    subscribe( data => {
      this.dialogRef.close();
      alert('status commande modifié avec succès');
  //    this.toastr.success("Status Appro Modifier avec Succès");
  //    this.crudApi.filter('Register click');
      this.getListCommandeDTOs();
      this.router.navigate(['/admin/commandes']);
    });
  }


}
