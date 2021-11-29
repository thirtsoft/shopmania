import { CustomerFactureComponent } from './body/myaccount/customer-facture/customer-facture.component';
import { UpdateCustomerPasswordComponent } from './body/myaccount/update-customer-password/update-customer-password.component';
import { UpdateCustomerUsernameComponent } from './body/myaccount/update-customer-username/update-customer-username.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProductComponent } from './body/detail-product/detail-product.component';
import { ContactComponent } from './body/contact/contact.component';
import { AboutComponent } from './body/about/about.component';
import { FaqComponent } from './body/faq/faq.component';
import { ShopComponent } from './body/shop/shop.component';
import { HomeComponent } from './body/home/home.component';
import { CartComponent } from './body/cart/cart.component';
import { CheckoutComponent } from './body/checkout/checkout.component';
import { MyaccountComponent } from './body/myaccount/myaccount.component';
import { WishListComponent } from './body/wish-list/wish-list.component';
import { LoginComponent } from './body/login/login.component';

import { SuccessRegisterComponent } from './body/success-register/success-register.component';
import { SuccessOrderComponent } from './body/success-order/success-order.component';
import { RegisterComponent } from './body/register/register.component';
import { SuccessEmailComponent } from './body/success-email/success-email.component';


const routes: Routes = [
  // { path: '', component: HomeComponent},
  {
    path: '',   redirectTo: 'home', pathMatch: 'full'
  }, // redirect to
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'search/:keyword',
    component: HomeComponent
  },
  {
    path: 'product-detail/:reference',
    component: DetailProductComponent
  },
  {
    path: 'products',
    component: ShopComponent
  },
  {
    path: 'category/:id',
    component: ShopComponent
  },
  {
    path: 'searchInshop/:keyword',
    component: ShopComponent
  },
  {
    path: 'searchbyPrice/:price',
    component: ShopComponent
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
    path: 'success-order',
    component: SuccessOrderComponent
  },/*
   {
    path: 'my-account',
    component: MyaccountComponent
  },*/
  {
    path: 'my-account/:id',
    component: MyaccountComponent
  },
  {
    path: 'my-account/:id',
    component: UpdateCustomerUsernameComponent
  },
  {
    path: 'my-account/:id',
    component: UpdateCustomerPasswordComponent
  },
  {
    path : 'facture/:id',
    component : CustomerFactureComponent
  },
  {
    path: 'wishlist',
    component: WishListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'success-register',
    component: SuccessRegisterComponent
  },
  {
    path : 'email-success',
    component: SuccessEmailComponent
  },
  {
    path: 'contactus',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
