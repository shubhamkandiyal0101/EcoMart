import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { AuthUsersService } from 'src/app/user-domain/service/auth-users.service';

@Component({
  selector: 'app-home-header',
  imports: [RouterLink],
  templateUrl: './home-header.html',
  styleUrl: './home-header.css',
})
export class HomeHeader {

  isLoggedIn = signal(false);

  constructor(
    private productService: ProductService,
    private authUserService: AuthUsersService
  ) {}

  get totalQty() {
    return this.productService.totalQty;
  }

  ngOnInit() {
   this.isLoggedIn.update(()=>this.authUserService.isLoggedIn())
  }

}
