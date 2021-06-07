import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService } from './../../../services/article.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { ArticleDto } from './../../../model/article';
import { FournisseurDto } from './../../../model/fournisseur';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {

  formDataFournisseurDTO: FournisseurDto = new FournisseurDto();
  deleteFournisseurDTO: FournisseurDto;
  ListArticleDTO: ArticleDto[];

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(private fournisseurService: FournisseurService,
              private articleService: ArticleService,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private actRoute: ActivatedRoute,

  ){
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getFournisseurDTOById(this.paramId);
    }
    this.getListArticleDTOs();

  }
  public getListArticleDTOs(): void {
    this.articleService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.ListArticleDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  getFournisseurDTOById(id: number) {
    console.log('getOne');
    this.fournisseurService.getFournisseurDtoById(id).subscribe(
      (response: FournisseurDto) => {
        console.log('data--', response);
        this.formDataFournisseurDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  submit() {
    console.log('Data send--', this.formDataFournisseurDTO);
    this.fournisseurService.addFournisseurDto(this.formDataFournisseurDTO).subscribe(
      (response: FournisseurDto) => {
        console.log('Response--', response);
        let _html=`
          <div class="c-green">
            <div class="material-icons">task_alt</div>
            <h1>Fournisseur Created Success!</h1>
          </div>`;
          this.openDialog(_html);
          this.router.navigate([`/admin/fournisseurs`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  update() {
    console.log('Data send--', this.formDataFournisseurDTO);
    this.fournisseurService.updateFournisseurDto(this.formDataFournisseurDTO.id, this.formDataFournisseurDTO).subscribe(
      (response: FournisseurDto) => {
        console.log('Response--', response);
        let _html=`
            <div class="c-green">
              <div class="material-icons">task_alt</div>
              <h1>Fournisseur Update Success!</h1>
            </div>`;

        this.openDialog(_html);
        this.router.navigate([`/admin/fournisseurs`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }
/*
  public onAddFournisseur() {
    this.fournisseurService.addFournisseurDto(this.formDataFournisseurDTO).subscribe(
      (response: FournisseurDto) => {
        this.dialogRef.close();
        this.toastr.success("Fournisseur Ajouté avec Succès");
        this.router.navigate(['/backend/admin/fournisseurs']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

 */

}
