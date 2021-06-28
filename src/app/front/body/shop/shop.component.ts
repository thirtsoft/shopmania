import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CatalogueService } from './../../../services/catalogue.service';
import { ArticleService } from './../../../services/article.service';
import { CartService } from './../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleDto } from './../../../model/article';
import { DataService } from '../../../shared/data.service';
import  axios  from 'axios';
import { CartItem } from './../../../model/cartItem';


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

  public currentTime: number = 0;

  currentCategoryId: number;

  previousCategoryId: number = 1;

  searchMode: boolean = false;

  priceSearch: number;

  constructor(private dataService: DataService,
              public catalogueService: CatalogueService,
              private artService: ArticleService,
              private cartService: CartService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
  //            private productService:ProductService,
  ){ }

  ngOnInit() {
  //  this.dataService.currentCart.subscribe(editCart => (this.cart = editCart));
  this.route.paramMap.subscribe(()=> {
    this.getListArticleDTOs();
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

  updateStatusCart() {

  }

  getListArticleDTOs() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.priceSearch = +this.route.snapshot.paramMap.get('price');
    if (this.searchMode) {
      this.getArticleListDTOsBySearchKeyword();
    }
     else  {
      this.handlerListArticleDTOs();
    //  this.getArticleListDTOsBySamePriceByPageable();
    }

  }

  handlerListArticleDTOs() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.catalogueService.getListArticleDTOByScategoryByPageable(
          this.currentCategoryId,
          this.currentPage - 1,
          this.size).subscribe(this.processResult());
  }

  getArticleListDTOsBySamePriceByPageable() {
    const hasPriceId: boolean = this.route.snapshot.paramMap.has('price');
    if (hasPriceId) {
      this.priceSearch = +this.route.snapshot.paramMap.get('price');
    }
    this.catalogueService.getListArticleDTOBySamePriceByPageable(
        this.priceSearch,
        this.currentPage - 1,
          this.size).subscribe(this.processResult());

  }

  processResult() {
    return data => {
      this.totalPages = data['totalPages'];
      this.pages = new Array(data['totalPages']);
      this.articleListDTOBs = data['content'];
    }

  }

   // Liste des produits par page
   getArticleDTOByPageable() {
    this.catalogueService.getListArticleDTOByPageable(this.currentPage, this.size)
      .subscribe(data=> {
        this.totalPages = data['totalPages'];
        this.pages = new Array(data['totalPages']);
        this.articleListDTOBs = data['content'];
        console.log(data);
      },err=> {
        console.log(err);
      });

  }

  getArticleListDTOsBySearchKeyword() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.catalogueService.getListArticleDTOByKeyword(keyword).subscribe(
      data  => {
        this.articleListDTOBs = data;
      }

    )

  }

  getArticleListDTOsBySamePrice() {
    const hasPriceId: boolean = this.route.snapshot.paramMap.has('price');
    if (hasPriceId) {
      this.priceSearch = +this.route.snapshot.paramMap.get('price');
    }
    this.catalogueService.getListArticleDTOBySamePrice(this.priceSearch).subscribe(
      data  => {
        this.articleListDTOBs = data;
      }

    )

  }

  addTocart(articleDTO: ArticleDto) {
    console.log(`total designation: ${articleDTO.designation}, total price: ${articleDTO.price}`);
    const cartItem = new CartItem(articleDTO);
    this.cartService.addTocart(cartItem);
    this.toastr.success('au panier avec succès','Article Ajoutée', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
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


}
