import { Component, computed, signal } from '@angular/core';
import { ProductCatModel, ProductModel } from '../models/product-model';
import { ProductCardComponent } from "../shared/product-card/product-card.component";
import { ProductService } from '../services/product.service';
import { CategoryComponent } from "../shared/product/category/category.component";
import { ProductListComponent } from "../shared/product/product-list/product-list.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [ProductListComponent, CategoryComponent, ProductListComponent, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  protected readonly title = signal('eco-mart');

  cartCount = 1;
  search = '';

  prodCat = computed<ProductCatModel[]>(
    ()=>this.productService.getProductCategories
  )

  products = computed<any>(
    ()=>this.productService.getProducts
  )
  

  constructor(private productService:ProductService) {}

  ngOnInit() {
    
    // set product categories
    if(this.prodCat()?.length) {
      return;
    }
    this.productService.getProdCat().subscribe()
    // ends here ~ set product categories
  }

  

  // filteredProducts() {
  //   const q = this.search.trim().toLowerCase();
  //   return q ? this.products.filter((p) => p.title.toLowerCase().includes(q)) : this.products;
  // }

  

}
