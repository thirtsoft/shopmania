import { AddNotificationComponent } from './add-notification/add-notification.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResumeComponent } from './resume/resume.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { HomeComponent } from './home/home.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { ListCustomersOrdersComponent } from './list-customers-orders/list-customers-orders.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'order',
    component: AddOrdersComponent
  },
  {
    path: 'orders',
    component: ListCustomersOrdersComponent
  },
  {
    path: 'billingAddress',
    component: BillingAddressComponent
  },
  {
    path: 'shippingAdress',
    component: ShippingAddressComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'payments',
    component: PaymentComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'listNotifications',
    component: ListNotificationComponent
  },
  {
    path: 'addNotification',
    component: AddNotificationComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
