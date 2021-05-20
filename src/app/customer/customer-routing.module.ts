import { DetailProductComponent } from './detail-product/detail-product.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ShopComponent } from './shop/shop.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'single-product',
    component: DetailProductComponent
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
    path: 'payment',
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
    path: 'about-us',
    component: AboutComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'faq',
    component: FaqComponent
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
