import { RegisterComponent } from './body/register/register.component';
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





const routes: Routes = [
  // { path: '', component: HomeComponent},
  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // redirect to
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:slug', component: DetailProductComponent },
  { path: 'products', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-account', component: MyaccountComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contactus', component: ContactComponent},
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
