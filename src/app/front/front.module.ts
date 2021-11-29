import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { FrontRoutingModule } from './front-routing.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination' ;

import { MaterialModule } from '../shared/material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { SearchInShopComponent } from './body/search-in-shop/search-in-shop.component';
import { SearchbyPriceComponent } from './body/searchby-price/searchby-price.component';
import { SuccessOrderComponent } from './body/success-order/success-order.component';
import { SuccessRegisterComponent } from './body/success-register/success-register.component';
import { RatingComponent } from './body/ratings/rating/rating.component';
import { ListRatingComponent } from './body/ratings/list-rating/list-rating.component';
import { ArticleListTop12OrderByCreatedDateDescComponent } from './body/article-list-top12-order-by-created-date-desc/article-list-top12-order-by-created-date-desc.component';
import { SuccessEmailComponent } from './body/success-email/success-email.component';
import { UpdateCustomerUsernameComponent } from './body/myaccount/update-customer-username/update-customer-username.component';
import { UpdateCustomerPasswordComponent } from './body/myaccount/update-customer-password/update-customer-password.component';
import { CustomerFactureComponent } from './body/myaccount/customer-facture/customer-facture.component';


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
    SearchInShopComponent,
    SearchbyPriceComponent,
    SuccessOrderComponent,
    SuccessRegisterComponent,
    RatingComponent,
    ListRatingComponent,
    ArticleListTop12OrderByCreatedDateDescComponent,
    SuccessEmailComponent,
    UpdateCustomerUsernameComponent,
    UpdateCustomerPasswordComponent,
    CustomerFactureComponent,
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,

    MatExpansionModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  entryComponents: [
    UpdateCustomerUsernameComponent, UpdateCustomerPasswordComponent, CustomerFactureComponent
  ]
})
export class FrontModule { }
