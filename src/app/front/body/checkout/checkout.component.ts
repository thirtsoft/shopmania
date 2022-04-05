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

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Emial is", this.checkoutFormGroup.get('customer').value.email);
  //  console.log("Checkout ShippingAddress", this.checkoutFormGroup.get('shippingAddress').value);
  //  console.log("Checkout BillingAddress", this.checkoutFormGroup.get('billingAddress').value);
    console.log("Checkout Value are", this.checkoutFormGroup.value);

    let commande = new Commande();
    commande.totalCommande = this.totalPrice;
    commande.totalQuantity = this.totalQuantity;

    console.log("User " + this.catalogueService.id);

    console.log("Username " + this.catalogueService.username);

    console.log("Current User " + this.catalogueService.currentUser);

    console.log(commande.totalCommande);

    console.log(commande.totalQuantity);

    let lcomms: LigneCommande[] = this.cartItems.map(tempCartItem => new LigneCommande(tempCartItem));

    // setup purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.client = this.checkoutFormGroup.get('customer').value;

    // populate purchase - shippingAddress
    purchase.shippingAddress = this.checkoutFormGroup.get('shippingAddress').value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    console.log(shippingState);
  //  console.log(purchase.shippingAddress.state.name);
    console.log(purchase.shippingAddress.state);
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    console.log(shippingCountry);
    console.log(purchase.shippingAddress.country);
    purchase.shippingAddress.state.name = shippingState.name;
  //  purchase.shippingAddress.state.name = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

     // populate purchase - billingAddress
     purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
     const billingState: StateDto = JSON.parse(JSON.stringify(purchase.billingAddress.state));
     const billingCountry: CountryDto = JSON.parse(JSON.stringify(purchase.billingAddress.country));
  //   purchase.billingAddress.state.name = billingState.name;
     purchase.billingAddress.state.name = billingState.name;
     purchase.billingAddress.country = billingCountry.name;

     // populate purchase - order and orderItems

    purchase.commande = commande;
    purchase.lcomms = lcomms;

    console.log("Purchase is", purchase);

      // call REST API via checkoutService

    console.log("Conected user is", this.checkoutService.id);


  //  this.checkoutService.placeToOrder(purchase).subscribe(

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

    console.log(`{formGroupName} country code: ${countryCode}`);
    console.log(`{formGroupName} country name: ${countryName}`);

    this.statService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl('/products');
  }

  getTS() {
    return this.currentTime;
  }

}
