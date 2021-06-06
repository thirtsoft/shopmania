import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios  from 'axios';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cart:any;
  categories;
//  imgPath: string = environment.image_path;

  constructor(
//    private categoryService:CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }
  async getCategories() {
    try {
      const response = await  axios.get('assets/data/categories');
      console.log("response data", response.data);
      console.log("response status", response.status);

      this.categories = response.data;

    } catch (e) {
      console.log(e);
    }

  }

}
