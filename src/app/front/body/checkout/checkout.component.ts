import { AddresslivraisonService } from './../../../services/addresslivraison.service';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogueService } from './../../../services/catalogue.service';
import { CommandeService } from './../../../services/commande.service';
import { CartItem } from './../../../model/cartItem';
import { CartService } from './../../../services/cart.service';
import { StateService } from './../../../services/state.service';
import { StateDto } from './../../../model/state';
import { CountryService } from './../../../services/country.service';
import { CountryDto } from './../../../model/country';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shippingCost: number;

  currentTime: number = 0;

  listStateDto: StateDto[];
  listCountryDto: CountryDto[];

  constructor(public catalogueService: CatalogueService,
              private cartService: CartService,
              private comService: CommandeService,
              private clientService: ClientService,
              private addService: AddresslivraisonService,
              private toastr: ToastrService,
              private countService: CountryService,
              private statService: StateService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.cartDetails();

    this.getListCountryDTOs();

    this.getListStateDTOs();
  }

  cartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.shippingCost = this.cartService.shippingCost;

    this.cartService.calculateTotalPrice();

  }

  getListCountryDTOs() {
    this.countService.getCountryDTOs().subscribe(
      (response: CountryDto[]) => {
        this.listCountryDto = response;
        console.log(this.listCountryDto);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getListStateDTOs() {
    this.statService.getStateDTOs().subscribe(
      (response: StateDto[]) => {
        this.listStateDto = response;
        console.log(this.listStateDto);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  onSaveClient(event) {

  }

  onSaveAddressLivraison(event) {}

  onOrder(){}

  getTS() {
    return this.currentTime;
  }

}
