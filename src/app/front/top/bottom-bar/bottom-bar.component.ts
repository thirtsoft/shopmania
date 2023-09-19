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

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.updateCartStatus();

  }

  updateCartStatus() {
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      }
    )
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )

  }
}
