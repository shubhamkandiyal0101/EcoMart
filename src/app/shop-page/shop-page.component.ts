import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../shared/product/product-list/product-list.component";
import { ProductCatModel } from '../models/product-model';
import { ProductService } from '../services/product.service';
import { CategoryComponent } from "../shared/product/category/category.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-page',
  imports: [ProductListComponent, CategoryComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
})
export class ShopPageComponent implements OnInit {
  prodCat = computed<ProductCatModel[]>(
    ()=>this.productService.getProductCategories
  )
  categorySlug = signal("");


  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute
  ) {
    effect(()=>{
      const selCatInfo = this.prodCat().find((cat)=>cat.slug==this.categorySlug());
      
      if(selCatInfo?.id) {
        this.getCatProduct(selCatInfo.id)
      }
      
    })
  }

  ngOnInit() {

    // set product categories
    if(this.prodCat()?.length) {
      return;
    }
    this.productService.getProdCat().subscribe()
    // ends here ~ set product categories

    this.activatedRoute.params.subscribe((data:any)=>{
      this.categorySlug.set(data['category']);
      const selCatInfo = this.prodCat().find((cat)=>cat.slug==this.categorySlug());
      
      if(selCatInfo?.id) {
        this.getCatProduct(selCatInfo.id)
      }
   
    })
    
  }

  getCatProduct(catId:number) {
    this.productService.getCatProductsCall(catId).subscribe()
  }

}
