import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //--- New for add product
  //-- add subTotal:0, shippingCost:1, grandTotal:0, - shippingCost:1 for default
  public editCart: any = {cart: 0, products: [], subTotal:0, shippingCost:1, grandTotal:0};
  public subject = new Subject<any>();
  
  public cartSource = new BehaviorSubject(this.editCart);
  currentCart = this.cartSource.asObservable();

  updateCart(item) {
    this.cartSource.next(item);
  }
  
}
