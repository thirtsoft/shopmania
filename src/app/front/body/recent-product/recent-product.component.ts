import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import  axios  from 'axios';
import { DataService } from '../../../shared/data.service';

import { CatalogueService } from './../../../services/catalogue.service';
import { CartService } from './../../../services/cart.service';
import { ArticleDto } from './../../../model/article';
import { CartItem } from './../../../model/cartItem';

@Component({
  selector: 'app-recent-product',
  templateUrl: './recent-product.component.html',
  styleUrls: ['./recent-product.component.css']
})
export class RecentProductComponent implements OnInit {

  cart:any;
  products: any;
  articleTop12OrderByCreatedDateDesc: ArticleDto[];

  currentTime: number = 0;

  searchMode: boolean = false;

  starRating = 0;

  currentRating = 4;

  constructor(private dataService: DataService,
              private router: Router,
              public catalogueService: CatalogueService,
              private cartService: CartService,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute
  //            private productService:ProductService,
  ){ }

  ngOnInit(): void {
    this.getTop12ArticleListDTOsOrderByCreatedDateDesc();
  }


  public getTop12ArticleListDTOsOrderByCreatedDateDesc() {
    this.catalogueService.getTop12ArticleDTOOrderByCreatedDateDesc().subscribe(
      (response: ArticleDto[]) => {
        this.articleTop12OrderByCreatedDateDesc = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

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



}
