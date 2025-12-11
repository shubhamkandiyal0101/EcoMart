import { AfterViewChecked, Component, computed, effect, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from "../../product-card/product-card.component";
import { debounceTime, distinctUntilChanged, fromEvent, interval, skipWhile, takeWhile, throttle, throttleTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const pageLoadUrlArr=['shop'];



@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, AfterViewChecked {

    @Input() limitsProductTo!:number;
    isLoadMoreProducts:boolean = true;
    categorySlug = signal("");
    products = computed<any>(
      ()=> this.productService.getProducts
    )

    productIds = computed(()=>{
        if(!this.categorySlug() || this.categorySlug().trim() == "") {
          
          let productIds = this.products()?.allProductIds;
          if(this.limitsProductTo && this.limitsProductTo >= 0) {
            return Array.from(productIds).slice(0,this.limitsProductTo)
          }
          return productIds

        } else {
          return this.products()?.categoryProductIds[this.categorySlug()];
        }
    });

    

    constructor(
      private productService:ProductService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) {
       

    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((data:any)=>{
          if(data["category"]) {
            this.categorySlug.update(()=>data["category"]); 
          
          } else {
            this.fetchProducts();
          }
        })

   
    }

    ngAfterViewChecked() {

      // scroll Evt
      const scrollEvt = fromEvent(window,'scroll');
      scrollEvt
      .pipe(
        throttleTime(10000),
        takeWhile(()=>{
         return this.isLoadMoreProducts; 
        }),
        takeWhile(()=>{
          
          let loadMoreProducts = false;
          const routerUrlArr = this.router.url.split('/')

          if(routerUrlArr.length > 1){
            loadMoreProducts = false; 
            return loadMoreProducts
          };

          for(let url of pageLoadUrlArr) {
            const routerUrlIndex = routerUrlArr.indexOf(url);
            if(routerUrlIndex > -1) {
              loadMoreProducts = true;
              break;
            }
          }

          return loadMoreProducts

        })
      )
      .subscribe((evt)=>{
        console.log('its firing')
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 1) { 
            if(!this.categorySlug() || this.categorySlug().trim() == "") {
              this.fetchProducts();
            }
        }

      })
      // ends here ~ scroll Evt

    }


    // fetch products
    fetchProducts() {
      let prodStartingIndex = 0;
      let prodEndingIndex = 12;
      
      const productLength = Object.keys(this.products()['productsMap']).length;
      
      if(productLength) {
        prodStartingIndex = productLength;
        prodEndingIndex = prodStartingIndex+12;
      } 

      this.isLoadMoreProducts = false
      this.productService.getProductsCall(prodStartingIndex,prodEndingIndex).subscribe({
        next:(data) => {
          // console.log(data)
          this.isLoadMoreProducts = true
        }
      })
    }
    // ends here ~ fetch products

    // load more products
    // loadMoreProducts() {
    //   console.log(' load more products firing')
    // }
    // ends here ~ load more products

}
