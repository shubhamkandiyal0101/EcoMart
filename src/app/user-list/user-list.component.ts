import { Component, computed, signal } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {


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
