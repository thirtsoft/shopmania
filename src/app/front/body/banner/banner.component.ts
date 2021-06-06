import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios  from 'axios';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  allData;
//  imgPath: string = environment.image_path;

  slideIndex = 0;
  images:any=[];
  clearTimeout;

  constructor(
 //   private bannerService:BannerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBanner();
  }

  async getBanner(){
    const data =  await  axios.get('assets/data/banners');
    if(data){
      this.allData = data.data;

      this.allData.forEach(obj => {
        this.images.push({
          show: 1,
          img: obj.bImage,
          caption: obj.bTitle,
          link: obj.bLink
        });
      });
    }
    this.showSlides();

  }

  showSlides() {
    let slides = this.images;
    for (let i = 0; i < slides.length; i++) {
      slides[i].show = 0;
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {this.slideIndex = 1}
    slides[this.slideIndex-1].show = 1;
    this.clearTimeout = setTimeout(() => { this.showSlides(); }, 5000);
  }

  plusSlides(n:any) {
    this.showSlides2(this.slideIndex += n);
    //--clear and set timout again
    clearTimeout(this.clearTimeout);
    this.clearTimeout = setTimeout(() => { this.showSlides(); }, 5000);
  }

  showSlides2(n:any) {
    let slides = this.images;
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].show = 0;
    }
    slides[this.slideIndex-1].show = 1;
  }


}
