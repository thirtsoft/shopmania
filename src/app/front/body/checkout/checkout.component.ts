import { Utilisateur } from './../../../model/utilisateur';

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../../auth/token-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Purchase } from './../../../model/purchase';
import { CatalogueService } from './../../../services/catalogue.service';
import { CartItem } from './../../../model/cartItem';
import { CartService } from './../../../services/cart.service';
import { StateService } from './../../../services/state.service';
import { CheckoutService } from './../../../services/checkout.service';
import { StateDto, State } from './../../../model/state';
import { CountryService } from './../../../services/country.service';
import { CountryDto, Country } from './../../../model/country';
import { LigneCommande } from './../../../model/ligne-commande';
import { Commande } from './../../../model/commande';

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

  checkoutFormGroup: FormGroup;

  formData:  FormGroup;

  idUser: any;


  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  shippingAddressStates: StateDto[] = [];
  billingAddressStates: StateDto[] = [];

  isLoggedIn = false;
  username: any;
  userId: any;

  constructor(public catalogueService: CatalogueService,
              private cartService: CartService,
              private tokenService: TokenStorageService,
              private countService: CountryService,
              private checkoutService: CheckoutService,
              private statService: StateService,
              private router: Router,
              private formBuilder: FormBuilder
  ) { }

//  get f() { return this.checkoutFormGroup.controls; }

  ngOnInit(): void {
    this.initForm();
    this.cartDetails();
    this.getListCountryDTOs();
    this.getListStateDTOs();
    this.checkoutService.getUserId();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.catalogueService.getUserId();
      this.idUser = this.catalogueService.id
      this.catalogueService.getLogginUser();
      this.catalogueService.getUsername();
      this.username = this.catalogueService.username;
      this.userId = this.catalogueService.id;
    }
  }

  initForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        mobile: [''],
        email: ['']
      }),
      
      shippingAddress: this.formBuilder.group({
        rue: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),

      billingAddress: this.formBuilder.group({
        rue: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      id: this.catalogueService.id
    });
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
        console.log(error.message);
      }
    );
  }

  getListStateDTOs() {
    this.statService.getStateDTOs().subscribe(
      (response: StateDto[]) => {
        this.listStateDto = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  onSubmit() {
    let commande = new Commande();
    commande.totalCommande = this.totalPrice;
    commande.totalQuantity = this.totalQuantity;
    let lcomms: LigneCommande[] = this.cartItems.map(tempCartItem => new LigneCommande(tempCartItem));
    let purchase = new Purchase();
    purchase.client = this.checkoutFormGroup.get('customer').value;

    //  purchase.shippingAddress.state.name = shippingState.name;
    purchase.shippingAddress = this.checkoutFormGroup.get('shippingAddress').value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state.name = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

     // populate purchase - billingAddress
   //  purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
     purchase.billingAddress = this.checkoutFormGroup.get('billingAddress').value;
     const billingState: StateDto = JSON.parse(JSON.stringify(purchase.billingAddress.state));
     const billingCountry: CountryDto = JSON.parse(JSON.stringify(purchase.billingAddress.country));
     purchase.billingAddress.state.name = billingState.name;
     purchase.billingAddress.country = billingCountry.name;

    purchase.commande = commande;
    purchase.lcomms = lcomms;

    this.checkoutService.placeToOrderWithUser(purchase, this.checkoutService.id).subscribe(
      data =>{
         alert(`Nous avons bien reçu votre commande.\n order tracking number: ${data.orderTrackingNumber}`);
      //    reset checkout form
         this.resetCart();
         console.log("Response is", data);
         this.router.navigateByUrl("success-order");
      },
      error=>{
        alert(`there was a error: ${error.message}`);
      }
    )

  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
        this.billingAddressStates = this.shippingAddressStates;
    }else {
        this.checkoutFormGroup.controls.billingAddress.reset();
        this.billingAddressStates = [];
    }
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
    this.statService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );

  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/products');
  }

  getTS() {
    return this.currentTime;
  }

}