import { Component, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent {
  productUrl = signal("");
  productInfo = signal<any>([])

  qty = 1;
  selectedImage: string | null = null;

  product = {
    id: 1,
    title: "Laptop Pro 15",
    price: 45000,
    description: "High performance laptop for developers.",
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/600",
      "https://via.placeholder.com/700"
    ],
    category: { id: 1, name: "Electronics" },
    rating: 4.7
  };


  constructor(
    private productService:ProductService,
    private activateRoute:ActivatedRoute
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

  addToCart(product: any) {
    console.log('Added to cart:', product, 'Qty:', this.qty);
  }

  getProductInfo() {
    this.productService.getSingleProduct(this.productUrl()).subscribe((response)=>{
      this.productInfo.set(response);
    })
  }

}
