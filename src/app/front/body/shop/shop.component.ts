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

  size: number = 9;
  currentPage: number = 1;
  totalPages: number;
  pages: Array<number>;

  currentTime: number = 0;

  currentCategoryId: number;

  previousCategoryId: number = 1;

  searchMode: boolean = false;

  priceSearch: number;

  starRating = 0;

  currentRating = 4;

  constructor(private dataService: DataService,
              public catalogueService: CatalogueService,
              private artService: ArticleService,
              private cartService: CartService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
  ){ }

  ngOnInit() {
    this.route.paramMap.subscribe(()=> {
      this.getListArticleDTOs();
    });
  }

  public getArticleListDTOs() {
    this.artService.getAllActivesArticles().subscribe(
      (response: ArticleDto[]) => {
        this.articleListDTOBs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

  getListArticleDTOs() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.priceSearch = +this.route.snapshot.paramMap.get('price');
    if (this.searchMode) {
      this.getArticleListDTOsBySearchKeyword();
    }
     else  {
      this.handlerListArticleDTOs();
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

   getArticleDTOByPageable() {
    this.catalogueService.getListArticleDTOByPageable(this.currentPage, this.size)
      .subscribe(data=> {
        this.totalPages = data['totalPages'];
        this.pages = new Array(data['totalPages']);
        this.articleListDTOBs = data['content'];
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

  sort(event: any) {
    console.log(event.target.value)
    switch (event.target.value) {
      case "Low":
        {
          this.articleListDTOBs = this.articleListDTOBs.sort((low, high) => low.price - high.price);
          break;
        }
      case "High":
        {
          this.articleListDTOBs = this.articleListDTOBs.sort((low, high) => high.price - low.price);
          break;
        }
      case "Name":
        {
          this.articleListDTOBs = this.articleListDTOBs.sort(function (low, high) {
            if (low.designation < high.designation) {
              return -1;
            }
            else if (low.designation > high.designation) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        this.articleListDTOBs = this.articleListDTOBs.sort((low, high) => low.price - high.price);
        break;
      }

    }
    return this.articleListDTOBs;
  }

  bynow() {
    this.router.navigate(["cart"]);
  }
}
