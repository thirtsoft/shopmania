import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListCustomersOrdersComponent } from './list-customers-orders/list-customers-orders.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ResumeComponent } from './resume/resume.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { PaymentComponent } from './payment/payment.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ListCustomersOrdersComponent,
    AddOrdersComponent,
    CheckoutComponent,
    CartComponent,
    ResumeComponent,
    ShippingAddressComponent,
    BillingAddressComponent,
    PaymentComponent,
    AddNotificationComponent,
    ListNotificationComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
