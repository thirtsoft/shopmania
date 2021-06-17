import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios  from 'axios';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

    // Slider Images
    slides = [
      {'image': 'assets/customer/img/slider-1.jpg'}, 
      {'image': 'assets/customer/img/slider-2.jpg'},
      {'image': 'assets/customer/img/slider-3.jpg'}, 
      
  ]


  constructor(
 //   private bannerService:BannerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }




}
