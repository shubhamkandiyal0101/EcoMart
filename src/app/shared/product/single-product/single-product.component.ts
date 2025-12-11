import { Component, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-single-product',
  imports: [CurrencyPipe],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent {
  productUrl = signal("");
  productInfo = signal<any>([])

  qty = 1;
  selectedImage: string | null = null;

  cartItems: {
    qty: number,
    productId: number
  }[] = []

  constructor(
    private productService:ProductService,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private hotToastService: HotToastService
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe((data)=>{
      this.productUrl.update(()=>data['productUrl']);
      this.getProductInfo();
    })
  }


  incrementQty() {
    this.qty++;
  }

  decrementQty() {
    if (this.qty > 1) this.qty--;
  }

  addToCart(itemQtyParam:string) {
    // console.log('Added to cart:', product, 'Qty:', this.qty);
    
    const itemQty = parseInt(itemQtyParam)

    if(itemQty > 5) {
      this.hotToastService.error('Max 5 Quantities allowed for per item');
      return;
    }

      // get cart items from localstorage
    let cartItemsStr = localStorage.getItem('cartItems')
    if(cartItemsStr?.length) {
      const cartItems = JSON.parse(cartItemsStr)
      if(cartItems?.length > 0) {
        this.cartItems = cartItems; 
      }
    }
    // ends here ~ get cart items from localstorage

    const itemIndex = this.cartItems.findIndex(cartItem=>cartItem.productId == this.productInfo().id);

    if(itemIndex == -1) {
      const { id, ...productDetails } = this.productInfo();
      this.cartItems.push({
        qty:itemQty,
        productId: this.productInfo()['id'],
        ...productDetails
      })
    }  else {
      
      this.cartItems[itemIndex]['qty'] = itemQty;
    }

    localStorage.setItem('cartItems',JSON.stringify(this.cartItems))

    
  }

  getProductInfo() {
    this.productService.getSingleProduct(this.productUrl()).subscribe({
      next:(response)=>{
        this.productInfo.set(response);
      },
      error:(err)=>{
        this.router.navigate(['/shop'])
      }
    })
  }

}
