import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { FrontRoutingModule } from './front-routing.module';

import { HomeComponent } from './body/home/home.component';

import { WishListComponent } from './body/wish-list/wish-list.component';
import { FooterComponent } from './bottom/footer/footer.component';
import { FooterBottomComponent } from './bottom/footer-bottom/footer-bottom.component';
import { MainFooterComponent } from './bottom/main-footer/main-footer.component';
import { BottomBarComponent } from './top/bottom-bar/bottom-bar.component';
import { MainTopComponent } from './top/main-top/main-top.component';
import { NavComponent } from './top/nav/nav.component';
import { TopBarComponent } from './top/top-bar/top-bar.component';
import { NavbarComponent } from './top/navbar/navbar.component';
import { PageNotfoundComponent } from './body/page-notfound/page-notfound.component';
import { CartComponent } from './body/cart/cart.component';
import { CheckoutComponent } from './body/checkout/checkout.component';
import { AboutComponent } from './body/about/about.component';
import { ShopComponent } from './body/shop/shop.component';
import { ContactComponent } from './body/contact/contact.component';
import { FaqComponent } from './body/faq/faq.component';
import { DetailProductComponent } from './body/detail-product/detail-product.component';
import { CustomDashboardComponent } from './body/custom-dashboard/custom-dashboard.component';
import { CallToActionComponent } from './body/call-to-action/call-to-action.component';
import { BrandComponent } from './body/brand/brand.component';
import { BreadcrumbComponent } from './body/breadcrumb/breadcrumb.component';
import { FeatureProductComponent } from './body/feature-product/feature-product.component';
import { LoginComponent } from './body/login/login.component';
import { MyaccountComponent } from './body/myaccount/myaccount.component';
import { MainBannerComponent } from './body/main-banner/main-banner.component';
import { CategoryComponent } from './body/category/category.component';
import { NewsArrivalsComponent } from './body/news-arrivals/news-arrivals.component';
import { MainBodyComponent } from './body/main-body/main-body.component';
import { NewsletterComponent } from './body/newsletter/newsletter.component';
import { RecentProductComponent } from './body/recent-product/recent-product.component';
import { ReviewComponent } from './body/review/review.component';
import { SearchComponent } from './body/search/search.component';
import { RegisterComponent } from './body/register/register.component';
import { SidebarComponent } from './body/sidebar/sidebar.component';
import { SidebarBrandsComponent } from './body/sidebar-brands/sidebar-brands.component';
import { SidebarCatComponent } from './body/sidebar-cat/sidebar-cat.component';
import { SidebarTagComponent } from './body/sidebar-tag/sidebar-tag.component';
import { SidebarSliderComponent } from './body/sidebar-slider/sidebar-slider.component';
import { BestSellerComponent } from './body/best-seller/best-seller.component';
import { BestSellingComponent } from './body/best-selling/best-selling.component';
import { BannerComponent } from './body/banner/banner.component';
import { FeatureComponent } from './body/feature/feature.component';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotfoundComponent,
    CheckoutComponent,
    CartComponent,
    ShopComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    DetailProductComponent,
    CustomDashboardComponent,
    CallToActionComponent,
    BrandComponent,
    BreadcrumbComponent,
    LoginComponent,
    FeatureProductComponent,
    FeatureProductComponent,
    MyaccountComponent,
    MainBannerComponent,
    CategoryComponent,
    MainBodyComponent,
    NewsArrivalsComponent,
    NewsletterComponent,
    RecentProductComponent,
    ReviewComponent,
    PageNotfoundComponent,
    SearchComponent,
    RegisterComponent,
    SidebarComponent,
    SidebarBrandsComponent,
    SidebarCatComponent,
    SidebarTagComponent,
    SidebarSliderComponent,
    WishListComponent,
    FooterComponent,
    FooterBottomComponent,
    MainFooterComponent,
    BottomBarComponent,
    MainTopComponent,
    NavComponent,
    TopBarComponent,
    NavbarComponent,
    BestSellerComponent,
    BestSellingComponent,
    BannerComponent,
    FeatureComponent,
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class FrontModule { }