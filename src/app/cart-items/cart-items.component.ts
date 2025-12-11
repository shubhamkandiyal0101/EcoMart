import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-cart-items',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
})
export class CartItemsComponent {


  cartProducts:any = [];

  constructor(private hotToastService: HotToastService) {
    // localStorage.getItem('cartItems')
    this.getCartItems();
  }

  getCartItems() {
    // get cart items from localstorage
    let cartItemsStr = localStorage.getItem('cartItems')
    if(cartItemsStr?.length) {
      const cartItems = JSON.parse(cartItemsStr)
      if(cartItems?.length > 0) {
        this.cartProducts = cartItems; 
      }
    }
    // ends here ~ get cart items from localstorage
  }

  get totalQty() {
    return this.cartProducts.reduce((sum:number, item:any) => sum + item.qty, 0);
  }

  get totalPrice() {
    return this.cartProducts.reduce((sum:number, item:any) => sum + (item.qty * item.price), 0);
  }

  increment(item: any) {
    if(item.qty >= 5 ) {
      this.hotToastService.error('Max 5 Quantities allowed for per item');
      return;
    }
    item.qty++;
  }

  decrement(item: any) {
    if (item.qty > 1) item.qty--;
  }

  remove(item: any) {
    
    this.cartProducts = this.cartProducts.filter((p:any) => p.productId !== item.productId);
    localStorage.setItem('cartItems',JSON.stringify(this.cartProducts))
  }


}
