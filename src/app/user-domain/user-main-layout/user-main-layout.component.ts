import { Component } from '@angular/core';
import { UserHeaderComponent } from "../shared/user-header/user-header.component";
import { UserFooterComponent } from "../shared/user-footer/user-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-main-layout',
  imports: [UserHeaderComponent, RouterOutlet, UserFooterComponent],
  templateUrl: './user-main-layout.component.html',
  styleUrl: './user-main-layout.component.css',
})
export class UserMainLayoutComponent {

}
