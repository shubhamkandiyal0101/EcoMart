import { Component, OnInit } from '@angular/core';
import { AuthUsersService } from '../service/auth-users.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  
  constructor(private authUserService: AuthUsersService) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.authUserService.getUserProfile().subscribe({
     next:(data)=>{
      console.log(data)
     } 
    })
  }

}
