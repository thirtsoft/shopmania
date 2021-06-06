import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products;
  cart;
  cartItem=[]; // for car list show
  constructor(private dataService: DataService,
              private router: Router,
              private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(editCart => (this.cart = editCart));
    console.log('ngOnInit-this.cart---1---', this.cart);
    if(this.cart) {
      this.cartList(this.cart);

    }
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

  removeCart(pId) {
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
