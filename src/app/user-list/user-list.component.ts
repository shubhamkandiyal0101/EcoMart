import { Component, computed, signal } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {

  users = [
    {
      "email": "john@mail.com",
      "password": "changeme",
      "name": "Jhon",
      "role": "customer",
      "avatar": "https://i.imgur.com/LDOO4Qs.jpg"
    },
    {
      "email": "alice@mail.com",
      "password": "changeme",
      "name": "Alice",
      "role": "admin",
      "avatar": "https://i.imgur.com/3GvwNBf.jpeg"
    }

  ];

  userList = computed<any>(()=>this.userService.userListData);
  

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.userListData;
    this.fetchUserList();
  }

  fetchUserList() {
    if(!this.userList().length || this.userList().length == 0) {
      this.userService.getUserListCall().subscribe();
    }
  }

}
