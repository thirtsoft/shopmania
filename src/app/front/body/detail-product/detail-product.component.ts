import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../services/cart.service';
import { CatalogueService } from './../../../services/catalogue.service';
import { ArticleService } from './../../../services/article.service';
import { DataService } from '../../../shared/data.service';
import  axios  from 'axios';
import { ArticleDto } from './../../../model/article';
import { CartItem } from './../../../model/cartItem';
import { NotificationDto } from './../../../model/notification';
import { DashboardService } from './../../../services/dashboard.service';
import { NotificationService } from './../../../services/notification.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  cart:any;
  products;
  product;
  slug;
  pImageDefault='blank.jpg';
  pImages=['blank.jpg'];
  qtyDefault = 1;

  articleDTOs: ArticleDto = new ArticleDto();
  notificationListDTO: NotificationDto[];

  numberOfRatingForProduct;
  ref: string;
  currentRating = 4;

  starRating = 0;

  maxRatingValue = 5;

  constructor(public artService: ArticleService,
              private cartService: CartService,
              private dashboardService: DashboardService,
              public catalogueService: CatalogueService,
              private ratingService: NotificationService,
              private toastr: ToastrService,
              private router: Router,
              private actRoute: ActivatedRoute,
    //          private dataService: DataService
  ){}

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(()=> {
      this.getSingleArticleDTO();
    });

    this.countNumberOfRatingForProduct();

    this.getListOfTop4RatingOrderByCreatedDateDescByPrpductId();

    /*
    this.actRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      console.log("this.slug--1-", this.slug);
    });
*/
/*
    this.actRoute.paramMap.subscribe(params => {
      this.reference = params.get('reference');
      console.log("this.reference--1-", this.reference);
    });

    this.dataService.currentCart.subscribe(editCart => (this.cart = editCart));

    this.getSingleProduct(this.slug);

    this.getSingleArticleDTO(this.reference);
*/
  }

  public getSingleArticleDTO() {
  //  const ref: string = this.actRoute.snapshot.paramMap.get('reference');
    this.ref = this.actRoute.snapshot.paramMap.get('reference');
    this.artService.getArticleDtoByReference(this.ref).subscribe(
      response => {
        this.articleDTOs = response;
        console.log(this.articleDTOs);
        }
        ,(error: HttpErrorResponse) => {
      alert(error.message);
    });

  }

  public countNumberOfRatingForProduct() {
    this.dashboardService.countNumberOfNotificationByProductId(this.ref)
      .subscribe(
        response => {
          this.numberOfRatingForProduct = response;
          console.log(this.numberOfRatingForProduct);
        }
        ,(error: HttpErrorResponse) => {
      alert(error.message);
    });

  }

  public getListOfTop4RatingOrderByCreatedDateDescByPrpductId() {
    this.ratingService.getTop4RatingOrderByCreatedDateDescByProduct(this.ref)
      .subscribe(
      (response: NotificationDto[]) => {
        this.notificationListDTO = response;
        console.log(this.notificationListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  addTocart() {
    console.log(`total designation: ${this.articleDTOs.designation}, total price: ${this.articleDTOs.price}`);
    const cartItem = new CartItem(this.articleDTOs);
    this.cartService.addTocart(cartItem);
//    this.toastr.success('Article Ajoutée au panier avec succès');
    this.toastr.success('au panier avec succès','Article Ajoutée', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
    });

 /*    this.toastrService.error('everything is broken', 'Major Error', {
      timeOut: 3000,
    }); */

  }

  /*  async getSingleProduct(slug) {
    try {
      const response = await  axios.get('assets/data/products.json');
      console.log("response data", response.data);
      console.log("response status", response.status);

      this.products = response.data;

      let chkSlug = this.products[this.products.findIndex(obj => obj.pSlug === slug)];
      console.log("chkSlug--", chkSlug);
      if(chkSlug) {
        this.product = this.products[this.products.findIndex(obj => obj.pSlug === slug)];
        console.log("this.product---", this.product);
        this.pImageDefault = this.product.pImageDefault;
        this.pImages = this.product.pImages;

      }else {
        this.router.navigate(["products"]);

      }

    } catch (e) {
      console.log(e);
    }

  } */

  /* add2cat(qty,product) {
    let n = 0;
    for (n; n < qty; n++) {
      this.cart.products.push(product);
    }

    this.cart.cart = this.cart.cart + qty;

    this.dataService.updateCart(this.cart);
    console.log("this.cart--", this.cart);
  } */

  bynow() {
    this.router.navigate(['cart']);
  }

  minus() {
    this.qtyDefault = this.articleDTOs.quantite;
    if(this.qtyDefault > 1) {
      this.qtyDefault--;
      console.log('minus');
    }

  }

  plus() {
    this.qtyDefault++;
    console.log('plus');
  }


}
