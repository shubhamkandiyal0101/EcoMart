import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthUsersService } from '../../service/auth-users.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {
  userName = 'John Doe';
  userAvatar = 'https://i.imgur.com/LDOO4Qs.jpg';

  constructor(
    private hotToastService: HotToastService,
    private router: Router,
    private authUserService:AuthUsersService,
    private productService: ProductService 
  ) {}

  logout() {
    this.hotToastService.success("Logout Successfully");
    this.authUserService.logout();
  }

  get totalQty() {
    return this.productService.totalQty;
  }
}
