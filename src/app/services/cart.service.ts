import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import { CartItem } from './../model/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
 /*  totalPrice: Subject<number> = new Subject<number>(); */
 /*
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  */
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);


  shippingCost: number = 2000 ;

  constructor() { }

  addTocart(theCartItem: CartItem){
    // check wether article/item is already in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }else {
      // add to the cart item array
      this.cartItems.push(theCartItem);
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // calculate total price and total quantity
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    console.log(`total price: ${totalPriceValue}, total quantity: ${totalQuantityValue}`);

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  getTotalPrice(): Observable<any> {
    return this.totalPrice.asObservable();
  }

  getTotalQuantity(): Observable<any> {
    return this.totalQuantity.asObservable();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);

    } else {
      this.calculateTotalPrice();
    }

  }

  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex((tempCartItem) => tempCartItem.id === cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.calculateTotalPrice();

    }
  }


}
