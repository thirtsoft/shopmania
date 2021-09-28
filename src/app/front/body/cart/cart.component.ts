import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './../../../auth/token-storage.service';

import { CartService } from './../../../services/cart.service';
import { CartItem } from './../../../model/cartItem';
import { CatalogueService } from './../../../services/catalogue.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products;
  cart;
  cartItem=[]; // for car list show

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shippingCost: number;

  currentTime: number = 0;
  isLoggedIn = false;
  username: string;

  constructor(private dataService: DataService,
              public catalogueService: CatalogueService,
              private cartService: CartService,
              private tokenService: TokenStorageService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartDetails();
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

    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();

      this.catalogueService.getUserId();

      this.username = user.username;

    }



  }

   // increment quantity
   inCrementQuantity(cartItem: CartItem) {
    console.log('increment quantity', cartItem);
    this.cartService.addTocart(cartItem);
    this.toastr.success('au panier avec succès','Article Ajoutée', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
    });

  }

  // decrement quantity
  decrementQuantity(cartItem: CartItem) {
    console.log('decrement', cartItem);
    this.cartService.decrementQuantity(cartItem);
  }

  removeCart(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

  getTS() {
    return this.currentTime;
  }


  cartList(items) {
    this.cartItem = [];
    console.log('Item---', items.products);

    items.products.forEach((item, index) => {
      if (index<=0) {
        //--first loop
        //-- add row
        let tmpData = {
          pId: item.pId,
          qty: 1,
          price: item.pPriceSale ? item.pPriceSale: item.pPrice,
          data: item
        };
        this.cartItem.push(tmpData);
      }else {
        //-------
        // after first loop check same pId and add qty
        if(this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.pId)]) {
          // -- if have
          // -- get data old one
          let currentData = this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.pId)];
          //-- update qty
          currentData.qty = currentData.qty+1;
        }else {
          //--if not have yet
          //-- add new same first loop
          let tmpData = {
            pId: item.pId,
            qty: 1,
            price: item.pPriceSale ? item.pPriceSale: item.pPrice,
            data: item
          }
          this.cartItem.push(tmpData);
        }
      }

    });
  }

  minus(product) {
    // --add new item
    this.add2cat('minus', product);
    //--reload this again
    this.ngOnInit();
  }
  plus(product) {
    //-- add new item
    this.add2cat('plus', product);
    //--reload this again
    this.ngOnInit();
  }

  add2cat(type, product) {
    if(type === 'plus') {
      this.cart.products.push(product);
      this.cart.cart = this.cart.cart + 1;

      //--part Cart Summary
      let _price = product.pPriceSale ? product.pPriceSale: product.pPrice;
      this.cart.subTotal = this.cart.subTotal + _price;
      this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;

    }else {
      //--minus
      //--remove from cart
      if(this.cart.products.findIndex(obj => obj.pId === product.pId) >= 0) { //--if not found it return -1
        let tmpIndex = this.cart.products.findIndex(obj => obj.pId === product.pId);
        //-- arr.splice(index, 1)
        this.cart.products.splice(tmpIndex, 1); //-- remove 1 list
        this.cart.cart = this.cart.cart - 1; //--minus cart count

        //-- part Cart Summary
        //-- set in data service
        let _price = product.pPriceSale ? product.pPriceSale: product.pPrice;
        this.cart.subTotal = this.cart.subTotal + _price;
        this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;
      }
    }
    this.dataService.updateCart(this.cart);

    console.log('this.cart--', this.cart);

  }

  removeCarts(pId) {
    //-- find on cartItem list
    this.cartItem.forEach((item, index) => {
      if(item.pId === pId) {
        //--remove as qty on cartitem
        let n = 0;
        for(n; n < item.qty; n++) {
          this.add2cat('minus', item.data);
        }
        this.cartItem.splice(index, 1); //--remove 1 list
      }
    });
  }


}
