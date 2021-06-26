import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogueService } from './../../../services/catalogue.service';
import { CartItem } from './../../../model/cartItem';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(public catalogueService: CatalogueService,
              private cartService: CartService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

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

  }

  getTS() {
    return this.currentTime;
  }

}
