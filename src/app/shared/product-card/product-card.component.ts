import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ImgCarouselComponent } from "../img-carousel/img-carousel.component";
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [ImgCarouselComponent, CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  cartItems: {
    qty: number,
    productId: number
  }[] = []
  @Input({required:true}) product!: any; 

  constructor() {
    console.log(this.product)
  }

  addToCart() {

    // get cart items from localstorage
    let cartItemsStr = localStorage.getItem('cartItems')
    if(cartItemsStr?.length) {
      const cartItems = JSON.parse(cartItemsStr)
      if(cartItems?.length > 0) {
        this.cartItems = cartItems; 
      }
    }
    // ends here ~ get cart items from localstorage

    const itemIndex = this.cartItems.findIndex(cartItem=>cartItem.productId == this.product.id)

    if(itemIndex == -1) {
      const { id, ...productDetails } = this.product;
      this.cartItems.push({
        qty:1,
        productId: this.product['id'],
        ...productDetails
      })
    }  else {
      if(this.cartItems[itemIndex]['qty'] >= 5) {
        alert('Max 5 Quantities allowed for per item')
        return;
      }
      this.cartItems[itemIndex]['qty'] += 1;
    }

    localStorage.setItem('cartItems',JSON.stringify(this.cartItems))

  }

}
