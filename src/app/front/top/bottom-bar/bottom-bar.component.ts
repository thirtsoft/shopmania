import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../services/cart.service';
import { DataService } from '../../../shared/data.service';
import { CartItem } from './../../../model/cartItem';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {

  cart: any;

  cartItems: CartItem[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private dataService: DataService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    //subscribe to the events
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartItems = this.cartService.cartItems;

  }

}
