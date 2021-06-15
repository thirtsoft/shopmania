import { HttpErrorResponse } from '@angular/common/http';
import { ArticleDto } from './../../../model/article';
import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import  axios  from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.css']
})
export class FeatureProductComponent implements OnInit {

  cart:any;
  products: any;
  articleListDTOBySelected: ArticleDto[];

  constructor(private dataService: DataService,
              private router: Router,
              public catalogueService: CatalogueService
  //            private productService:ProductService,
  ){ }

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(editCart => (this.cart = editCart));

  // get from data using axios
    this.getProducts();

    this.getArticleListDTOsBySelectedIsTrue();

  }

  public getArticleListDTOsBySelectedIsTrue() {
    this.catalogueService.getListArticleDTOBySelectedIsTrue().subscribe(
      (response: ArticleDto[]) => {
        this.articleListDTOBySelected = response;
        console.log(this.articleListDTOBySelected);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  async getProducts() {
    try {
      const response = await  axios.get('assets/data/products.json');
      console.log("response data", response.data);
      console.log("response status", response.status);

      this.products = response.data;

    } catch (e) {
      console.log(e);
    }

  }

  add2cart(qty,product) {
  //  let tmpCart = {cart: this.cart.cart + item, products: []};
    this.cart.products.push(product);
    this.cart.cart = this.cart.cart + qty;
 //   this.cart++;
    this.dataService.updateCart(this.cart);

    console.log("this.cart--", this.cart);
  }

  buynow() {
    this.router.navigate(["cart"]);
  }
  recentClick(item) {
  }


  /*
  recentClick(slug){
    const recent = this.productService.recentClick(slug);
    if(recent){
      console.log('recent-', recent);
    }
  }
*/

}
