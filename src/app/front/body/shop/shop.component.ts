import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CatalogueService } from './../../../services/catalogue.service';
import { ArticleService } from './../../../services/article.service';
import { ArticleDto } from './../../../model/article';
import { DataService } from '../../../shared/data.service';
import  axios  from 'axios';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  cart:any;
  products: any;
  articleListDTOBs: ArticleDto[];

  public size: number = 6;
  public currentPage: number = 1;
  public totalPages: number;
  public pages: Array<number>;
  public currentArticle;
  public keyword: string;
  public currentTime: number = 0;
  currentRequest: string;
  currentRequest2: string;
  curentCategoryId: number;

  currentCategorie;

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  categoryList :any;
  productsList:any;

  constructor(private dataService: DataService,
              private router: Router,
              public catalogueService: CatalogueService,
              private artService: ArticleService,
              private route: ActivatedRoute,
  //            private productService:ProductService,
  ){ }

  ngOnInit() {
  //  this.dataService.currentCart.subscribe(editCart => (this.cart = editCart));
  this.route.paramMap.subscribe(()=> {
    this.getListArtilceDTOs();
    console.log("Articles---", this.getListArtilceDTOs());
  });

  
  // get from data using axios
 //   this.getProducts();

  //  this.getArticleListDTOs();

  }

  public getArticleListDTOs() {
    this.artService.getArticleDTOs().subscribe(
      (response: ArticleDto[]) => {
        this.articleListDTOBs = response;
        console.log(this.articleListDTOBs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  getListArtilceDTOs() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log("HasParam id: ", + hasCategoryId);
    if (hasCategoryId) {
      this.curentCategoryId = +this.route.snapshot.paramMap.get('id');
    }else {
      this.curentCategoryId = 1;
      console.log("curentCategoryId id: ",  this.curentCategoryId);
    }

    if(this.previousCategoryId != this.curentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.curentCategoryId;

    this.catalogueService.getListArticleDTOByScategoryByPageable(
          this.curentCategoryId,
          this.currentPage - 1,
          this.size).subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.totalPages = data['totalPages'];
      //this.pages = new Array<number>(this.totalPages);
      this.pages = new Array(data['totalPages']);
      this.articleListDTOBs = data['content'];
    }

  }

   // Liste des produits par page
   getArticleDTOByPageable() {
    this.catalogueService.getListArticleDTOByPageable(this.currentPage, this.size)
      .subscribe(data=> {
        this.totalPages = data['totalPages'];
        //this.pages = new Array<number>(this.totalPages);
        this.pages = new Array(data['totalPages']);
        this.articleListDTOBs = data['content'];
        console.log(data);
      },err=> {
        console.log(err);
      });

  }

  getTS() {
    return this.currentTime;
  }

  onPageArticle(i) {
    this.currentPage = i;
    this.getArticleDTOByPageable();
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

  add2cat(qty,product) {
  //  let tmpCart = {cart: this.cart.cart + item, products: []};
    this.cart.products.push(product);
    this.cart.cart = this.cart.cart + qty;
 //   this.cart++;
    this.dataService.updateCart(this.cart);

    console.log("this.cart--", this.cart);
  }

  bynow() {
    this.router.navigate(["cart"]);
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
