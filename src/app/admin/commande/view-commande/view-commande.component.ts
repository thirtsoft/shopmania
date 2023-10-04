import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { LigneLigneCommandeService } from './../../../services/lignecommande.service';
import { CommandeService } from './../../../services/commande.service';
import { CommandeDto } from './../../../model/commande';
import { LigneCommandeDto } from './../../../model/ligne-commande';
import { CatalogueService } from 'src/app/services/catalogue.service';

import * as moment from 'moment';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-commande',
  templateUrl: './view-commande.component.html',
  styleUrls: ['./view-commande.component.css']
})
export class ViewCommandeComponent implements OnInit {

  listData: CommandeDto[];
  comId: number;
  numeroCommande;
  totalCommande;
  dateCommande;
  client;
  username = '';

  constructor(public crudApi: CommandeService,
              public lcmdService: LigneLigneCommandeService,
              public catService: CatalogueService,
              private router : Router,
              public route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<ViewCommandeComponent>,
  ) { }

  ngOnInit(): void {
    this.comId = this.route.snapshot.params.id;
    this.lcmdService.getLigneCommandeDtosByCommandeId(this.comId).subscribe((data: LigneCommandeDto[]) => {
      this.lcmdService.listData = data;
      this.numeroCommande = this.lcmdService.listData[0].commandeDto.numeroCommande;
      this.totalCommande = this.lcmdService.listData[0].commandeDto.total;
      this.dateCommande = this.lcmdService.listData[0].commandeDto.dateCommande;
      this.client = this.lcmdService.listData[0].commandeDto.clientDto.firstName  + ' ' + this.lcmdService.listData[0].commandeDto.clientDto.lastName;
      this.username = this.lcmdService.listData[0].commandeDto.utilisateurDto.name;
    }, err => {
      console.log(err);
    })

  }


  getListCommandeClients() {
    this.crudApi.getAllActiveCommandes()
    .subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download('"FACTURE_"'+this.lcmdService.listData[0].commandeDto.numeroCommande+'.pdf');
  }

  getDocument() {
    return {
      content: [
        {
          text: 'Soulbusiness',
          fontSize: 15,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Vente habillements Hommes&Femmes, Cosmétiques, Parfum, et tout autes produits',
          fontSize: 11,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Au centre commerciale Touba sandaga Dakar boutique N° 239',
          fontSize: 9,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Tél: +221 77 147 75 28 / Email: bigsoul2018@gmail.com',
          fontSize: 8,
          bold: true,
          alignment: 'center',
          color: '#0000ff'
        },
        {

        },

        {
          columns: [

             [
              {
                text: `${this.lcmdService.listData[0].commandeDto.status}`,
                fontSize: 8,
                bold: true,
                color: '#0000ff',
                margin: [0, 15, 0, 15]
              },
              {
                text: ' Facturé à : ',
                fontSize: 8,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },
              {
                text: `${ this.lcmdService.listData[0].commandeDto.clientDto.firstName + ' ' + this.lcmdService.listData[0].commandeDto.clientDto.lastName }`,
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },
              {
                text: `Tél: ${this.lcmdService.listData[0].commandeDto.clientDto.mobile}`,
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },
              {
                text: `Email: ${this.lcmdService.listData[0].commandeDto.clientDto.email}`,
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },

            ],

            [
              {
                text:'Date : ' + moment(this.lcmdService.listData[0].commandeDto.dateCommande).format("DD/MM/YYYY"),
                alignment: 'right',
                margin: [0, 15, 0, 15],
                fontSize: 8,
              },
              {
                text: ' Adresse Livraison : ',
                fontSize: 8,
                color: '#0000ff',
                bold: true,
                alignment: 'right',
                margin: [0, 7, 0, 7],
              },
              {
                text: `rue :  ${this.lcmdService.listData[0].commandeDto.billingAddressDto.rue}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },
              {
                text: ` quartier : ${this.lcmdService.listData[0].commandeDto.billingAddressDto.city}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },

              {
                text: ` département : ${this.lcmdService.listData[0].commandeDto.billingAddressDto.stateDto.name}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },
              {
                text: ` région : ${this.lcmdService.listData[0].commandeDto.billingAddressDto.stateDto.countryDto.name}`,
                alignment: 'right',
                margin: [0, 5, 0, 5],
                fontSize: 8,
              },
            ],

          ]
        },

        {
          text: ' FACTURE ',
          alignment: 'center',
          fontSize: 8,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5]
        },
        {
          text: `N° : ${this.lcmdService.listData[0].commandeDto.numeroCommande}`,
          bold: true,
          fontSize: 8,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },


        {
          text: `Achat effectue par :  ${this.lcmdService.listData[0].commandeDto.utilisateurDto.name}`,
          bold: true,
          fontSize: 8,
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },


        {

        },

        this.getListLigneCommandes(this.lcmdService.listData),
        {

        },

        {
          text: `Total F CFA : ${this.lcmdService.listData[0].commandeDto.total}`,
          alignment: 'right',
          margin: [0, 8, 0, 8],
          bold: true,
          fontSize: 8,
        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right',
          decoration: 'underline',
        },


      ],

      styles: {
        header: {
          fontSize: 8,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 8,
          bold: true
        },
        total: {
          fontSize: 8,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 8,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        },

      }
    };

  }

  getListLigneCommandes(item: LigneCommandeDto[]) {
    return {
      table: {
        widths: ['auto', '*', 'auto', 'auto'],
        body: [
          [
            {
              text: 'Quantité',
              style: 'tableHeader',
            },
            {
              text: 'Désignation',
              style: 'tableHeader',
            },
            {
              text: 'P.Unitaire',
              style: 'tableHeader'
            },
            {
              text: 'P.Total',
              style: 'tableHeader'
            },

          ],
          ...item.map(x => {
            return ([x.quantity, x.productName, x.price,
              (x.quantity*x.price).toFixed(2)])
          }),
          [
            {
              text: 'Montant Total',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.lcmdService.listData.reduce((sum, x)=> sum + (x.quantity * x.price), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('admin/accueil/commandes');
  }

}
