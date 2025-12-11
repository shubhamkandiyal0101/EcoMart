import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailRegex, MobileRegex, PincodeRegex, StringSpacesRegex } from '../app.constants';
import * as States from "../data/states.json"; 
import * as Cities from "../data/cities.json";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout-page',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  
  states: any = States['states'];
  selectedStateCities: any = [];

  isCheckoutFormSubmitted: boolean = false;
  private formBuilder = inject(FormBuilder);

  cartProducts:any = [];

  constructor(private router:Router) {
    this.getCartItems();
  }

  checkoutForm = this.formBuilder.group({
    firstName: ['',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(StringSpacesRegex)
      ]
    ],
    lastName: ['',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(StringSpacesRegex)
      ]
    ],
    email: ['',
      [
        Validators.email,
        Validators.required,
        Validators.pattern(EmailRegex),
        Validators.maxLength(50)
      ]
    ],
    phone: ['',
      [
        Validators.required,
        Validators.pattern(MobileRegex),
        Validators.maxLength(10)
      ]
    ],
    addressInfo: this.formBuilder.group({
      address: ['',
        [Validators.required]
      ],
      city: ['',
        [Validators.required]
      ],
      state: ['',
        [Validators.required]
      ],
      pincode: ['',
        [
          Validators.required,
          Validators.pattern(PincodeRegex)
        ]
      ],
      country: ['India']
    })
  })

  ngOnInit() {

    // disabled country field
    const addressGroup = this.checkoutForm.get('addressInfo') as FormGroup;
    addressGroup.get('country')?.disable();
    // ends here ~ disabled country field

    this.checkoutForm.controls.addressInfo.controls.state.valueChanges.subscribe((state)=>{
      if(state) {
        this.selectedStateCities = (Cities as any)[state];
      } else {
        this.selectedStateCities = [];
      }
    })

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

    if(this.cartProducts.length == 0) {
      this.router.navigate(['/cart'])
    }
  }

  get totalQty() {
    return this.cartProducts.reduce((sum:number, item:any) => sum + item.qty, 0);
  }

  get totalPrice() {
    return this.cartProducts.reduce((sum:number, item:any) => sum + (item.qty * item.price), 0);
  }

  placeOrder() {
    this.isCheckoutFormSubmitted = true;
    if(this.checkoutForm.invalid) return;

    localStorage.removeItem('cartItems');

    const totalPrice = this.totalPrice;
    const orderId = Date.now().toString().slice(-6)
    this.router.navigate(['/thank-you'],
       { 
        queryParams: {
          amt: totalPrice, 
          orderId: orderId
        }
      }
    );

  }


}
