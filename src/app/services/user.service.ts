import { Injectable, signal } from '@angular/core';
import { API_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private httpClient:HttpClient) {}

  readonly userList = signal<any>([]);

  get userListData() {
    return this.userList
  }
 

  getUserListCall() {
    return this.httpClient.get(`${API_URL}/users`)
    .pipe(
      tap((data)=>this.userList.set(data))
    )
  }

  loginUserCall(userLoginData:Partial<{
    email:string | null,
    password:string | null
  }>) {
    return this.httpClient.post(`${API_URL}/auth/login`,userLoginData)
  }
  
}
