import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ProductCatModel, ProductListModel } from '../models/product-model';
import { API_URL } from '../app.config';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private httpClient:HttpClient) {}

  // shared product category data
  readonly prodCat = signal<ProductCatModel[]>([])
  get getProductCategories() {
    return this.prodCat()
  }
  // ends here ~ shared product category data

  // shared product data
  readonly products = signal<ProductListModel>({
    productsMap: {},
    allProductIds: new Set(),
    categoryProductIds: {}
  })
  get getProducts() {
    // console.log(' 1 : ',JSON.stringify(this.products()))
    return this.products()
  }
  // ends here ~ shared product data
 
  

  // get product category
  getProdCat(limit:number=5) {
    return this.httpClient.get(`${API_URL}/categories`)
    .pipe(
      map((data:any) =>{
        return data.slice(0,limit)
      }),
      tap((data)=>this.prodCat.set(data))
    )
  }
  // ends here ~ get product category

  getProductsCall(prodStartIndex?:number,prodEndIndex?:number) {
    let queryParams = "";
    if(prodStartIndex || prodEndIndex) {
      queryParams = `?offset=${prodStartIndex}&limit=${prodEndIndex}`;
    }

    return this.httpClient.get(`${API_URL}/products${queryParams}`)
    .pipe(
      tap((data:any)=>this.setProductList(data))
      // tap((data:any)=>this.products.set(data))
    )
  }

  getCatProductsCall(catId:number) {
    return this.httpClient.get(`${API_URL}/categories/${catId}/products`)
    .pipe(
      tap((data:any)=>this.setProductList(data))
    )
  }

  getSingleProduct(productUrl:string) {
    return this.httpClient.get(`${API_URL}/products/slug/${productUrl}`)
  }

  // function to set product list 
  setProductList(productData:any) {
    let { ...productListClone } = this.products();
    for(let i=0; i<productData.length; i++) {
      productListClone['productsMap'][productData[i]['id']]=productData[i];

      productListClone['allProductIds'].add(productData[i]['id'])
      
      // set product ids according to categories
      if(!productListClone['categoryProductIds'][productData[i]['category']['slug']]) {
        productListClone['categoryProductIds'][productData[i]['category']['slug']] = new Set() 
      }
      productListClone['categoryProductIds'][productData[i]['category']['slug']].add(productData[i]['id'])
      // ends here ~ set product ids according to categories

    }

    this.products.update(()=>productListClone);
  }
  // ends here ~ function to set product list

  // function to get product quantity
  get totalQty() {
    let cartItemsStr = localStorage.getItem('cartItems')
    if(cartItemsStr?.length) {
      const cartItems = JSON.parse(cartItemsStr)
      if(cartItems?.length > 0) {
        return cartItems.reduce((sum:number, item:any) => sum + item.qty, 0); 
      }
    }

    return 0;
  }
  // ends here ~ function to get product quantity


}
