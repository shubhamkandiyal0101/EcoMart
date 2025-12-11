import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-thank-you-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.css',
})
export class ThankYouPageComponent {
  orderId: string | Number | null = '';
  totalAmt = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params)=>{
      const totalAmtParams = params.get('amt');
      this.orderId = params.get('orderId');
      let totalAmt = 0;
      if(totalAmtParams) {
        totalAmt = parseInt(totalAmtParams)
      }
      if(typeof(totalAmt) == 'number') {
        this.totalAmt = totalAmt;
      }
    })

    if(!this.orderId || this.orderId == "" || this.totalAmt == 0 || !this.totalAmt) {
      console.log(this.orderId)
      console.log(this.totalAmt)
      this.router.navigate(['/cart']);
    }
  }
}
